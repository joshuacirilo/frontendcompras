/**
 * Contrato FE ↔ FastAPI Azure.
 * Fuente: OpenAPI de
 * https://python-api-g2dnemg4ewana3bb.westus3-01.azurewebsites.net/openapi.json
 *
 * Los reportes NO aceptan fecha_inicio/id_cliente/id_categoria/id_producto.
 * Params reales por endpoint:
 * - listados: limit, offset, q
 * - top10 / sin-*: limit
 * - compras/por-mes: anio
 * - compras/promedio: anio, mes
 */

export const EMPTY_FILTERS = {
  anio: "",
  mes: "",
};

export function pickListParams(params = {}) {
  const next = {};
  if (params.limit !== undefined && params.limit !== null && params.limit !== "") {
    next.limit = Number(params.limit);
  }
  if (params.offset !== undefined && params.offset !== null && params.offset !== "") {
    next.offset = Number(params.offset);
  }
  if (params.q) next.q = params.q;
  return next;
}

export function pickLimitParams(params = {}, defaultLimit = 10) {
  const next = { limit: defaultLimit };
  if (params.limit !== undefined && params.limit !== null && params.limit !== "") {
    next.limit = Number(params.limit);
  }
  return next;
}

export function pickComprasMesParams(params = {}) {
  const next = {};
  if (params.anio) next.anio = Number(params.anio);
  return next;
}

export function pickComprasPromedioParams(params = {}) {
  const next = {};
  if (params.anio) next.anio = Number(params.anio);
  if (params.mes) next.mes = Number(params.mes);
  return next;
}

export const REQUIRED_ENDPOINTS = {
  clientesTop10: "/api/clientes/top10",
  clientesSinCompras: "/api/clientes/sin-compras",
  clientesMayorConsumo: "/api/clientes/mayor-consumo",
  productosTop10: "/api/productos/top10",
  productosSinVentas: "/api/productos/sin-ventas",
  productosPorCategoria: "/api/productos/por-categoria",
  comprasPorMes: "/api/compras/por-mes",
  comprasPorAnio: "/api/compras/por-anio",
  comprasPromedio: "/api/compras/promedio",
  tarjetasMasUtilizadas: "/api/tarjetas/mas-utilizadas",
  tarjetasCreditoVsDebito: "/api/tarjetas/credito-vs-debito",
  tarjetasPorMarca: "/api/tarjetas/por-marca",
};
