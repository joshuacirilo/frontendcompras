import {
  pickComprasMesParams,
  pickComprasPromedioParams,
  pickListParams,
} from "../../../config/apiContract";
import { mockCompras, settleOrMock } from "../../../data/mockData";
import { apiRequest, getListPayload } from "../../../services/apiService";
import {
  firstValue,
  formatCount,
  formatCurrency,
  monthLabel,
  percentOfMax,
  toNumber,
} from "../../../utils/dataFormat";

export function getCompras(params) {
  return apiRequest("/api/compras", { params: pickListParams(params) });
}

export function getCompraById(idCompra) {
  return apiRequest(`/api/compras/${idCompra}`);
}

export function getDetalleCompras(params) {
  return apiRequest("/api/detalle-compras", { params: pickListParams(params) });
}

export function getDetalleCompraById(idDetalle) {
  return apiRequest(`/api/detalle-compras/${idDetalle}`);
}

export function getComprasPorMes(params) {
  const query = pickComprasMesParams(params);
  return apiRequest("/api/compras/por-mes", Object.keys(query).length ? { params: query } : undefined);
}

export function getComprasPorAnio() {
  return apiRequest("/api/compras/por-anio");
}

export function getComprasPromedio(params) {
  const query = pickComprasPromedioParams(params);
  return apiRequest("/api/compras/promedio", Object.keys(query).length ? { params: query } : undefined);
}

function normalizeMonthlySales(records) {
  return {
    labels: records.map((record, index) => monthLabel(record, index)),
    values: records.map((record) =>
      toNumber(firstValue(record, ["monto_total", "total_facturado", "total", "ventas", "facturado", "amount"], 0)),
    ),
  };
}

function normalizeYearlySales(records) {
  const amounts = records.map((record) =>
    toNumber(firstValue(record, ["monto_total", "total_facturado", "total", "ventas", "facturado", "amount"], 0)),
  );
  const maxAmount = Math.max(...amounts, 0);

  return records.map((record, index) => {
    const amount = amounts[index];
    return {
      year: String(firstValue(record, ["anio", "year"], `Ano ${index + 1}`)),
      amount: formatCurrency(amount),
      percent: percentOfMax(amount, maxAmount),
      trend: firstValue(record, ["tendencia", "trend", "variacion"], "") || null,
      tone: index === 0 ? "primary" : index === 1 ? "secondary" : "muted",
    };
  });
}

function normalizeAverage(payload) {
  const source = Array.isArray(payload) ? payload[0] : payload;
  const average = firstValue(source, ["ticket_promedio", "promedio_compra", "promedio", "avg", "average"], null);
  const median = firstValue(source, ["mediana", "median"], null);
  const basket = firstValue(source, ["canasta_promedio", "skus_promedio", "items_promedio"], null);

  if (average === null || average === undefined) {
    return { value: null, summary: "La API no devolvio ticket promedio." };
  }

  let summary = `${formatCurrency(average)} por compra`;
  if (median !== null && median !== undefined) summary += `, mediana ${formatCurrency(median)}`;
  if (basket !== null && basket !== undefined) summary += ` y canasta regular de ${basket} SKUs`;
  summary += ".";

  return { value: formatCurrency(average), summary };
}

function buildPeakMonth(monthlySales) {
  if (!monthlySales.values.length) return null;

  const peakValue = Math.max(...monthlySales.values);
  const peakIndex = monthlySales.values.indexOf(peakValue);
  const peakLabel = monthlySales.labels[peakIndex] || "Sin periodo";

  return {
    title: `Mes mayor facturacion: ${peakLabel}`,
    badge: "API",
    description: "Periodo con mayor monto facturado segun /api/compras/por-mes.",
    stats: [
      ["Periodo", peakLabel],
      ["Monto", formatCurrency(peakValue)],
      ["Puntos en serie", formatCount(monthlySales.values.length)],
    ],
  };
}

export async function getComprasData(params = {}) {
  const mockFlags = [];

  const [monthlyResult, yearlyResult, averageResult] = await Promise.all([
    settleOrMock(getComprasPorMes(params), null, "compras/por-mes", mockFlags),
    settleOrMock(getComprasPorAnio(), null, "compras/por-anio", mockFlags),
    settleOrMock(getComprasPromedio(params), null, "compras/promedio", mockFlags),
  ]);

  const monthlySales = monthlyResult.usedMock
    ? mockCompras.monthlySales
    : normalizeMonthlySales(getListPayload(monthlyResult.value));

  const yearlySales = yearlyResult.usedMock
    ? mockCompras.yearlySales
    : normalizeYearlySales(getListPayload(yearlyResult.value));

  const average = averageResult.usedMock
    ? { value: "Q 78.14", summary: mockCompras.ticketAverageSummary }
    : normalizeAverage(averageResult.value);

  const peakMonth = monthlyResult.usedMock
    ? mockCompras.peakMonth
    : buildPeakMonth(monthlySales) || mockCompras.peakMonth;

  return {
    monthlySales,
    yearlySales,
    peakMonth,
    ticketAverageSummary: average.summary,
    usingMock: mockFlags.length > 0,
    mockReasons: mockFlags,
    hasApiData: true,
  };
}
