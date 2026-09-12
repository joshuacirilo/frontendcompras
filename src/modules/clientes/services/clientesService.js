import { pickLimitParams, pickListParams } from "../../../config/apiContract";
import { mockClientes, settleOrMock } from "../../../data/mockData";
import { apiRequest, getListPayload } from "../../../services/apiService";
import { colorAt, firstValue, toNumber } from "../../../utils/dataFormat";

export function getClientes(params) {
  return apiRequest("/api/clientes", { params: pickListParams(params) });
}

export function getClienteById(idCliente) {
  return apiRequest(`/api/clientes/${idCliente}`);
}

export function getTopClientes(params) {
  return apiRequest("/api/clientes/top10", { params: pickLimitParams(params, 10) });
}

export function getClientesSinCompras(params) {
  return apiRequest("/api/clientes/sin-compras", { params: pickLimitParams(params, 50) });
}

export function getClienteMayorConsumo() {
  return apiRequest("/api/clientes/mayor-consumo");
}

function normalizeTopByAmount(record) {
  return [
    firstValue(record, ["nombre", "nombre_cliente", "cliente", "name"], "Cliente"),
    toNumber(firstValue(record, ["monto_total", "total_compras", "total", "total_comprado"], 0)),
  ];
}

function normalizeTopByPurchases(record) {
  return [
    firstValue(record, ["nombre", "nombre_cliente", "cliente", "name"], "Cliente"),
    toNumber(firstValue(record, ["cantidad_compras", "compras", "pedidos", "frecuencia"], 0)),
  ];
}

function hasPurchaseCount(record) {
  return firstValue(record, ["cantidad_compras", "compras", "pedidos", "frecuencia"], null) !== null;
}

function normalizeInactiveClient(record) {
  const name = firstValue(record, ["nombre", "nombre_cliente", "cliente", "name"], "Cliente sin nombre");
  return [
    String(firstValue(record, ["id_cliente", "id", "nit", "dpi"], "N/D")),
    name,
    String(firstValue(record, ["genero", "sexo", "segmento"], "N/D")),
    "Sin compras",
  ];
}

function aggregateGender(records) {
  const counts = new Map();

  records.forEach((record) => {
    const gender = firstValue(record, ["genero", "sexo"], null);
    if (gender === null) return;
    const key = String(gender);
    counts.set(key, (counts.get(key) || 0) + 1);
  });

  if (!counts.size) return [];

  const total = [...counts.values()].reduce((sum, value) => sum + value, 0);
  return [...counts.entries()].map(([label, count], index) => [
    label,
    total ? Number(((count / total) * 100).toFixed(2)) : 0,
    colorAt(index),
  ]);
}

export async function getClientesData(params = {}) {
  const mockFlags = [];

  const [clientesResult, topResult, inactiveResult] = await Promise.all([
    settleOrMock(
      getClientes({ limit: 100, offset: 0 }),
      mockClientes.genderShare.map(([genero, porcentaje]) => ({ genero, porcentaje })),
      "clientes",
      mockFlags,
    ),
    settleOrMock(getTopClientes({ limit: 10 }), null, "clientes/top10", mockFlags),
    settleOrMock(getClientesSinCompras({ limit: 50 }), null, "clientes/sin-compras", mockFlags),
  ]);

  const topByAmount = topResult.usedMock
    ? mockClientes.topByAmount
    : getListPayload(topResult.value).map(normalizeTopByAmount);

  const topRecords = topResult.usedMock ? [] : getListPayload(topResult.value);
  const topByPurchases = topResult.usedMock
    ? mockClientes.topByPurchases
    : topRecords.some(hasPurchaseCount)
      ? topRecords.map(normalizeTopByPurchases)
      : mockClientes.topByPurchases;

  const inactiveClients = inactiveResult.usedMock
    ? mockClientes.inactiveClients
    : getListPayload(inactiveResult.value).map(normalizeInactiveClient);

  const genderShare = clientesResult.usedMock
    ? mockClientes.genderShare
    : (() => {
        const aggregated = aggregateGender(getListPayload(clientesResult.value));
        return aggregated.length ? aggregated : mockClientes.genderShare;
      })();

  if (!clientesResult.usedMock && !aggregateGender(getListPayload(clientesResult.value)).length) {
    mockFlags.push("clientes/genero: sin campo genero, usando mock");
  }

  if (!topResult.usedMock && topRecords.length && !topRecords.some(hasPurchaseCount)) {
    mockFlags.push("clientes/top10 cantidad: sin campo, usando mock");
  }

  return {
    topByAmount,
    topByPurchases,
    inactiveClients,
    genderShare,
    usingMock: mockFlags.length > 0,
    mockReasons: mockFlags,
    hasApiData: true,
  };
}
