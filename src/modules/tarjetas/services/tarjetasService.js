import { pickLimitParams, pickListParams } from "../../../config/apiContract";
import { mockTarjetas, settleOrMock } from "../../../data/mockData";
import { apiRequest, getListPayload } from "../../../services/apiService";
import {
  colorAt,
  firstValue,
  formatCount,
  formatCurrency,
  initialsFromName,
  toNumber,
} from "../../../utils/dataFormat";

export function getTarjetas(params) {
  return apiRequest("/api/tarjetas", { params: pickListParams(params) });
}

export function getTarjetaById(idTarjeta) {
  return apiRequest(`/api/tarjetas/${idTarjeta}`);
}

export function getMarcas(params) {
  return apiRequest("/api/marcas", { params: pickListParams(params) });
}

export function getMarcaById(idMarca) {
  return apiRequest(`/api/marcas/${idMarca}`);
}

export function getTarjetasMasUtilizadas(params) {
  return apiRequest("/api/tarjetas/mas-utilizadas", { params: pickLimitParams(params, 10) });
}

export function getTarjetasCreditoVsDebito() {
  return apiRequest("/api/tarjetas/credito-vs-debito");
}

export function getTarjetasPorMarca() {
  return apiRequest("/api/tarjetas/por-marca");
}

function normalizeCreditDebit(records) {
  return records.slice(0, 2).map((record, index) => [
    firstValue(record, ["tipo", "tipo_tarjeta", "modalidad", "label"], index === 0 ? "Credito" : "Debito"),
    toNumber(firstValue(record, ["porcentaje", "participacion", "share", "value"], 0)),
    colorAt(index),
  ]);
}

function normalizeMostUsedBrand(records) {
  if (!records.length) return null;

  const record = records[0];
  const brand = firstValue(record, ["marca", "nombre_marca", "brand", "nombre"], "Marca");
  const share = toNumber(firstValue(record, ["porcentaje", "participacion", "share", "value"], 0));
  const transactions = firstValue(record, ["total", "cantidad", "transacciones"], null);
  const volume = firstValue(record, ["monto_total", "total", "volumen", "amount"], null);
  const approval = firstValue(record, ["aprobacion", "approval", "tasa_aprobacion"], null);

  return {
    brand,
    share,
    transactions: transactions === null ? "—" : formatCount(transactions),
    volume: volume === null ? "—" : formatCurrency(volume),
    approval: approval === null ? "—" : `${approval}%`,
    detail: "Marca lider segun /api/tarjetas/por-marca o mas-utilizadas.",
  };
}

function normalizeTopClientsByCard(records) {
  return records
    .map((record) => {
      const client = firstValue(record, ["cliente", "nombre_cliente", "nombre", "name"], null);
      const type = firstValue(record, ["tipo", "tipo_tarjeta", "modalidad"], null);
      if (!client || !type) return null;

      return {
        initials: initialsFromName(client),
        client,
        type: String(type),
        card: String(firstValue(record, ["tarjeta", "numero", "marca"], "")),
        amount: formatCurrency(firstValue(record, ["monto_total", "total", "amount"], 0)),
        orders: `${formatCount(firstValue(record, ["ordenes", "compras", "cantidad"], 0))} ordenes`,
      };
    })
    .filter(Boolean);
}

export async function getTarjetasData() {
  const mockFlags = [];

  const [byBrandResult, creditDebitResult, mostUsedResult] = await Promise.all([
    settleOrMock(getTarjetasPorMarca(), null, "tarjetas/por-marca", mockFlags),
    settleOrMock(getTarjetasCreditoVsDebito(), null, "tarjetas/credito-vs-debito", mockFlags),
    settleOrMock(getTarjetasMasUtilizadas({ limit: 10 }), null, "tarjetas/mas-utilizadas", mockFlags),
  ]);

  const mostUsedBrand = byBrandResult.usedMock
    ? mockTarjetas.mostUsedBrand
    : normalizeMostUsedBrand(getListPayload(byBrandResult.value)) ||
      (mostUsedResult.usedMock
        ? mockTarjetas.mostUsedBrand
        : normalizeMostUsedBrand(getListPayload(mostUsedResult.value))) ||
      mockTarjetas.mostUsedBrand;

  if (!byBrandResult.usedMock && !normalizeMostUsedBrand(getListPayload(byBrandResult.value))) {
    mockFlags.push("tarjetas/por-marca: sin marca usable, usando mock");
  }

  const creditDebit = creditDebitResult.usedMock
    ? mockTarjetas.creditDebit
    : normalizeCreditDebit(getListPayload(creditDebitResult.value));

  let topClients = mostUsedResult.usedMock
    ? mockTarjetas.topClients
    : normalizeTopClientsByCard(getListPayload(mostUsedResult.value));

  if (!mostUsedResult.usedMock && !topClients.length) {
    topClients = mockTarjetas.topClients;
    mockFlags.push("tarjetas/top-clientes: sin cliente+tipo, usando mock");
  }

  return {
    mostUsedBrand,
    creditDebit: creditDebit.length ? creditDebit : mockTarjetas.creditDebit,
    topClients,
    usingMock: mockFlags.length > 0,
    mockReasons: mockFlags,
    hasApiData: true,
  };
}
