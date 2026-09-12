import {
  pickComprasMesParams,
  pickComprasPromedioParams,
  pickLimitParams,
  pickListParams,
} from "../../../config/apiContract";
import { mockDashboard, settleOrMock } from "../../../data/mockData";
import { apiRequest, getListPayload } from "../../../services/apiService";
import {
  colorAt,
  firstValue,
  formatCount,
  formatCurrency,
  monthLabel,
  percentOfMax,
  toNumber,
} from "../../../utils/dataFormat";

function normalizeMonthlySales(records) {
  return {
    labels: records.map((record, index) => monthLabel(record, index)),
    values: records.map((record) =>
      toNumber(firstValue(record, ["total_facturado", "monto_total", "total", "ventas", "facturado", "amount"], 0)),
    ),
  };
}

function normalizeTopClients(records) {
  const mapped = records.slice(0, 10).map((record) => {
    const amount = toNumber(
      firstValue(record, ["monto_total", "total_compras", "total", "total_comprado", "amount"], 0),
    );
    return [
      firstValue(record, ["nombre", "nombre_cliente", "cliente", "name"], "Cliente"),
      formatCurrency(amount),
      amount,
    ];
  });
  const max = Math.max(...mapped.map(([, , amount]) => amount), 0);
  return mapped.map(([name, amountLabel, amount]) => [name, amountLabel, percentOfMax(amount, max)]);
}

function normalizeTopProducts(records) {
  const mapped = records.slice(0, 10).map((record) => {
    const units = toNumber(firstValue(record, ["unidades", "cantidad", "vendidos", "total_vendido"], 0));
    const amount = toNumber(firstValue(record, ["monto_total", "total", "ingresos", "revenue"], 0));
    return [
      firstValue(record, ["nombre", "nombre_producto", "producto", "name"], "Producto"),
      `${formatCount(units)} u - ${formatCurrency(amount)}`,
      units,
    ];
  });
  const max = Math.max(...mapped.map(([, , units]) => units), 0);
  return mapped.map(([name, label, units]) => [name, label, percentOfMax(units, max)]);
}

function normalizeCategoryShare(records) {
  const withAmounts = records.map((record, index) => {
    const amount = toNumber(
      firstValue(record, ["monto_total", "total", "ingresos", "amount"], null) ??
        firstValue(record, ["porcentaje", "participacion", "share", "value"], 0),
    );
    return {
      label: firstValue(record, ["categoria", "nombre_categoria", "nombre", "category"], "Categoria"),
      amount,
      color: firstValue(record, ["color"], colorAt(index)),
      explicitPercent: firstValue(record, ["porcentaje", "participacion", "share"], null),
    };
  });

  const total = withAmounts.reduce((sum, item) => sum + item.amount, 0);

  return withAmounts.slice(0, 8).map((item) => {
    const percent =
      item.explicitPercent !== null && item.explicitPercent !== undefined
        ? toNumber(item.explicitPercent)
        : total
          ? Number(((item.amount / total) * 100).toFixed(2))
          : 0;
    return [item.label, percent, item.color];
  });
}

function normalizeCardBrands(records) {
  return records.slice(0, 8).map((record) => {
    const brand = firstValue(record, ["marca", "nombre_marca", "brand", "nombre"], "Marca");
    const percentage = toNumber(firstValue(record, ["porcentaje", "participacion", "share", "value"], 0));
    const total = firstValue(record, ["total", "cantidad", "transacciones"], 0);
    return [brand, String(brand).slice(0, 4).toUpperCase(), `${percentage}% (${formatCount(total)} u)`, percentage];
  });
}

function normalizePaymentTypes(records) {
  return records.slice(0, 2).map((record, index) => [
    firstValue(record, ["tipo", "tipo_tarjeta", "modalidad", "label"], index === 0 ? "Credito" : "Debito"),
    toNumber(firstValue(record, ["porcentaje", "participacion", "share", "value"], 0)),
    colorAt(index),
  ]);
}

function buildKpis({ averagePayload, comprasRaw, monthlySales, topClients, usedMock }) {
  const averageSource = Array.isArray(averagePayload) ? averagePayload[0] : averagePayload;
  const totalCompras = firstValue(
    averageSource,
    ["total_compras", "compras_total", "count"],
    firstValue(comprasRaw, ["total", "count", "total_compras"], null),
  );
  const montoTotal = monthlySales.values.reduce((sum, value) => sum + toNumber(value), 0);
  const average = firstValue(
    averageSource,
    ["promedio_compra", "ticket_promedio", "promedio", "avg", "average"],
    null,
  );

  if (usedMock && totalCompras === null && !monthlySales.values.length) {
    return mockDashboard.kpis;
  }

  return {
    totalCompras: {
      label: "Total compras",
      value: totalCompras === null || totalCompras === undefined ? "—" : formatCount(totalCompras),
      icon: "shopping_cart",
      trend: usedMock ? "Mock parcial" : totalCompras ? "API" : "Sin dato",
      detail: usedMock ? "Demo si API fallo" : "Transacciones",
    },
    clientesConCompras: {
      label: "Clientes con compras",
      value: topClients.length ? formatCount(topClients.length) : "—",
      icon: "groups",
      trend: usedMock ? "Mock parcial" : topClients.length ? "Top consumo" : "Sin dato",
      detail: usedMock ? "Demo si API fallo" : "Segun top clientes API",
    },
    montoTotalVendido: {
      label: "Monto total vendido",
      value: monthlySales.values.length ? formatCurrency(montoTotal) : "—",
      icon: "monetization_on",
      trend: usedMock ? "Mock parcial" : monthlySales.values.length ? "Suma por mes" : "Sin dato",
      detail: usedMock ? "Demo si API fallo" : "Desde /api/compras/por-mes",
      highlighted: true,
    },
    ticketPromedio: {
      label: "Ticket promedio",
      value: average === null || average === undefined ? "—" : formatCurrency(average),
      icon: "receipt",
      trend: usedMock ? "Mock parcial" : average !== null && average !== undefined ? "API promedio" : "Sin dato",
      detail: usedMock ? "Demo si API fallo" : "/api/compras/promedio",
    },
  };
}

export async function getDashboardData(params = {}) {
  const mockFlags = [];
  const listParams = pickListParams({ ...params, limit: 1, offset: 0 });
  const mesParams = pickComprasMesParams(params);
  const promedioParams = pickComprasPromedioParams(params);

  const [
    comprasResult,
    monthlyResult,
    averageResult,
    topClientsResult,
    topProductsResult,
    categoryResult,
    cardBrandsResult,
    paymentTypesResult,
  ] = await Promise.all([
    settleOrMock(apiRequest("/api/compras", { params: listParams }), { total: 12540 }, "compras", mockFlags),
    settleOrMock(
      apiRequest("/api/compras/por-mes", Object.keys(mesParams).length ? { params: mesParams } : undefined),
      mockDashboard.monthlySales,
      "compras/por-mes",
      mockFlags,
    ),
    settleOrMock(
      apiRequest(
        "/api/compras/promedio",
        Object.keys(promedioParams).length ? { params: promedioParams } : undefined,
      ),
      { ticket_promedio: 78.14, total_compras: 12540 },
      "compras/promedio",
      mockFlags,
    ),
    settleOrMock(
      apiRequest("/api/clientes/top10", { params: pickLimitParams(params, 10) }),
      mockDashboard.topClients.map(([nombre, , , amount]) => ({
        nombre,
        monto_total: Number(String(amount || 0).replace?.(/[^\d.]/g, "") || 0),
      })),
      "clientes/top10",
      mockFlags,
    ),
    settleOrMock(
      apiRequest("/api/productos/top10", { params: pickLimitParams(params, 10) }),
      mockDashboard.topProducts.map(([nombre]) => ({ nombre, unidades: 1000, monto_total: 10000 })),
      "productos/top10",
      mockFlags,
    ),
    settleOrMock(
      apiRequest("/api/productos/por-categoria"),
      mockDashboard.categoryShare.map(([categoria, porcentaje]) => ({ categoria, porcentaje })),
      "productos/por-categoria",
      mockFlags,
    ),
    settleOrMock(
      apiRequest("/api/tarjetas/por-marca"),
      mockDashboard.cardBrands.map(([marca, , , porcentaje]) => ({ marca, porcentaje, total: 100 })),
      "tarjetas/por-marca",
      mockFlags,
    ),
    settleOrMock(
      apiRequest("/api/tarjetas/credito-vs-debito"),
      mockDashboard.paymentTypes.map(([tipo, porcentaje]) => ({ tipo, porcentaje })),
      "tarjetas/credito-vs-debito",
      mockFlags,
    ),
  ]);

  const usingMock = mockFlags.length > 0;

  // Si el mock de por-mes ya viene normalizado (labels/values), usarlo directo
  const monthlySales = monthlyResult.usedMock
    ? mockDashboard.monthlySales
    : normalizeMonthlySales(getListPayload(monthlyResult.value));

  const topClients = topClientsResult.usedMock
    ? mockDashboard.topClients
    : normalizeTopClients(getListPayload(topClientsResult.value));

  const topProducts = topProductsResult.usedMock
    ? mockDashboard.topProducts
    : normalizeTopProducts(getListPayload(topProductsResult.value));

  const categoryShare = categoryResult.usedMock
    ? mockDashboard.categoryShare
    : normalizeCategoryShare(getListPayload(categoryResult.value));

  const cardBrands = cardBrandsResult.usedMock
    ? mockDashboard.cardBrands
    : normalizeCardBrands(getListPayload(cardBrandsResult.value));

  const paymentTypes = paymentTypesResult.usedMock
    ? mockDashboard.paymentTypes
    : normalizePaymentTypes(getListPayload(paymentTypesResult.value));

  const kpis =
    mockFlags.length >= 6
      ? mockDashboard.kpis
      : buildKpis({
          averagePayload: averageResult.value,
          comprasRaw: comprasResult.value,
          monthlySales,
          topClients,
          usedMock: usingMock,
        });

  return {
    kpis,
    monthlySales,
    topClients,
    topProducts,
    categoryShare,
    cardBrands,
    paymentTypes,
    errors: {},
    usingMock,
    mockReasons: mockFlags,
    hasApiData: true,
  };
}
