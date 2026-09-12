import { pickLimitParams, pickListParams } from "../../../config/apiContract";
import { mockProductos, settleOrMock } from "../../../data/mockData";
import { apiRequest, getListPayload } from "../../../services/apiService";
import { firstValue, formatCurrency, percentOfMax, toNumber } from "../../../utils/dataFormat";

export function getProductos(params) {
  return apiRequest("/api/productos", { params: pickListParams(params) });
}

export function getProductoById(idProducto) {
  return apiRequest(`/api/productos/${idProducto}`);
}

export function getTopProductos(params) {
  return apiRequest("/api/productos/top10", { params: pickLimitParams(params, 10) });
}

export function getProductosSinVentas(params) {
  return apiRequest("/api/productos/sin-ventas", { params: pickLimitParams(params, 50) });
}

export function getProductosPorCategoria() {
  return apiRequest("/api/productos/por-categoria");
}

function normalizeTopSold(records) {
  const mapped = records.slice(0, 10).map((record) => {
    const name = firstValue(record, ["nombre", "nombre_producto", "producto", "name"], "Producto");
    const units = toNumber(firstValue(record, ["unidades", "cantidad", "vendidos", "total_vendido"], 0));
    return [name, name, units, units];
  });
  const max = Math.max(...mapped.map(([, , units]) => units), 0);
  return mapped.map(([name, fullName, units]) => [name, fullName, units, percentOfMax(units, max)]);
}

function normalizeNeverPurchased(records) {
  return records.map((record) => [
    String(firstValue(record, ["sku", "codigo", "id_producto", "id"], "N/D")),
    firstValue(record, ["nombre", "nombre_producto", "producto", "name"], "Producto"),
    firstValue(record, ["categoria", "nombre_categoria", "category"], "N/D"),
    String(firstValue(record, ["fecha_ingreso", "fecha", "created_at"], "N/D")),
    formatCurrency(firstValue(record, ["precio", "precio_unitario", "price"], 0)),
  ]);
}

function normalizeTopRevenue(records) {
  return records
    .map((record) => {
      const name = firstValue(record, ["nombre", "nombre_producto", "producto", "name"], "Producto");
      const revenue = firstValue(record, ["monto_total", "total", "ingresos", "revenue", "ingreso"], null);
      const margin = firstValue(record, ["margen", "margen_bruto", "margin"], null);
      if (revenue === null || revenue === undefined) return null;
      return [
        name,
        toNumber(revenue),
        margin === null || margin === undefined ? null : toNumber(margin),
      ];
    })
    .filter(Boolean)
    .slice(0, 10);
}

export async function getProductosData(params = {}) {
  const mockFlags = [];

  const [topResult, neverResult] = await Promise.all([
    settleOrMock(getTopProductos({ limit: 10 }), null, "productos/top10", mockFlags),
    settleOrMock(getProductosSinVentas({ limit: 50 }), null, "productos/sin-ventas", mockFlags),
  ]);

  const topRecords = topResult.usedMock ? [] : getListPayload(topResult.value);
  const topSold = topResult.usedMock ? mockProductos.topSold : normalizeTopSold(topRecords);

  let topRevenue = topResult.usedMock ? mockProductos.topRevenue : normalizeTopRevenue(topRecords);
  if (!topResult.usedMock && !topRevenue.length) {
    topRevenue = mockProductos.topRevenue;
    mockFlags.push("productos/ingresos: sin monto en top10, usando mock");
  }

  const neverPurchased = neverResult.usedMock
    ? mockProductos.neverPurchased
    : normalizeNeverPurchased(getListPayload(neverResult.value));

  return {
    topSold,
    topRevenue,
    neverPurchased,
    usingMock: mockFlags.length > 0,
    mockReasons: mockFlags,
    hasApiData: true,
  };
}
