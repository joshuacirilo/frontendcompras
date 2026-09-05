import { apiRequest, buildApiUrl, getListPayload } from "../../../services/apiService";

export const allDashboardEndpointCards = [
  {
    id: "clientes",
    title: "Clientes",
    endpoint: "/api/clientes",
    icon: "groups",
    params: { limit: 10, offset: 0 },
  },
  {
    id: "clientes-top10",
    title: "Clientes top 10",
    endpoint: "/api/clientes/top10",
    icon: "workspace_premium",
  },
  {
    id: "clientes-sin-compras",
    title: "Clientes sin compras",
    endpoint: "/api/clientes/sin-compras",
    icon: "person_off",
    params: { limit: 10 },
  },
  {
    id: "cliente-mayor-consumo",
    title: "Cliente mayor consumo",
    endpoint: "/api/clientes/mayor-consumo",
    icon: "leaderboard",
  },
  {
    id: "productos",
    title: "Productos",
    endpoint: "/api/productos",
    icon: "inventory_2",
    params: { limit: 10, offset: 0 },
  },
  {
    id: "productos-top10",
    title: "Productos top 10",
    endpoint: "/api/productos/top10",
    icon: "trending_up",
    params: { limit: 10 },
  },
  {
    id: "productos-sin-ventas",
    title: "Productos sin ventas",
    endpoint: "/api/productos/sin-ventas",
    icon: "production_quantity_limits",
    params: { limit: 10 },
  },
  {
    id: "productos-por-categoria",
    title: "Productos por categoria",
    endpoint: "/api/productos/por-categoria",
    icon: "category",
  },
  {
    id: "categorias",
    title: "Categorias",
    endpoint: "/api/categorias",
    icon: "sell",
    params: { limit: 10, offset: 0 },
  },
  {
    id: "compras",
    title: "Compras",
    endpoint: "/api/compras",
    icon: "shopping_cart",
    params: { limit: 10, offset: 0 },
  },
  {
    id: "compras-por-mes",
    title: "Compras por mes",
    endpoint: "/api/compras/por-mes",
    icon: "calendar_month",
  },
  {
    id: "compras-por-anio",
    title: "Compras por anio",
    endpoint: "/api/compras/por-anio",
    icon: "date_range",
  },
  {
    id: "compras-promedio",
    title: "Compras promedio",
    endpoint: "/api/compras/promedio",
    icon: "receipt_long",
  },
  {
    id: "tarjetas",
    title: "Tarjetas",
    endpoint: "/api/tarjetas",
    icon: "credit_card",
  },
  {
    id: "tarjetas-mas-utilizadas",
    title: "Tarjetas mas utilizadas",
    endpoint: "/api/tarjetas/mas-utilizadas",
    icon: "contactless",
    params: { limit: 10 },
  },
  {
    id: "tarjetas-credito-debito",
    title: "Credito vs debito",
    endpoint: "/api/tarjetas/credito-vs-debito",
    icon: "payments",
  },
  {
    id: "tarjetas-por-marca",
    title: "Tarjetas por marca",
    endpoint: "/api/tarjetas/por-marca",
    icon: "credit_score",
  },
  {
    id: "marcas",
    title: "Marcas",
    endpoint: "/api/marcas",
    icon: "verified",
  },
];

const visibleDashboardEndpointIds = new Set([
  "clientes",
  "clientes-sin-compras",
  "cliente-mayor-consumo",
  "compras-por-anio",
  "compras-promedio",
  "tarjetas-credito-debito",
]);

export const dashboardEndpointCards = allDashboardEndpointCards.filter((card) =>
  visibleDashboardEndpointIds.has(card.id),
);

function firstValue(record, keys) {
  for (const key of keys) {
    if (record?.[key] !== undefined && record?.[key] !== null && record[key] !== "") {
      return record[key];
    }
  }

  return null;
}

function getExplicitCount(payload, list) {
  const count = firstValue(payload, ["total", "total_compras", "count", "Count"]);

  if (count !== null) return Number(count).toLocaleString("es-GT");
  if (list.length) return Number(list.length).toLocaleString("es-GT");

  return "0";
}

function summarizeRecord(record) {
  if (!record || typeof record !== "object") return "Respuesta disponible";

  const label = firstValue(record, [
    "nombre",
    "nombre_cliente",
    "nombre_producto",
    "categoria",
    "marca",
    "tipo",
    "anio",
    "mes",
    "id_compra",
    "id_cliente",
    "id_producto",
    "id_tarjeta",
  ]);
  const value = firstValue(record, [
    "total_facturado",
    "total_compra",
    "total_compras",
    "promedio_compra",
    "cantidad",
    "porcentaje",
  ]);

  if (label !== null && value !== null) return `${label}: ${value}`;
  if (label !== null) return String(label);
  if (value !== null) return String(value);

  return "Respuesta disponible";
}

function summarizePayload(payload) {
  const list = getListPayload(payload);
  const source = list[0] || (Array.isArray(payload) ? payload[0] : payload);

  return {
    count: getExplicitCount(payload, list),
    detail: list.length ? `${list.length} registros recibidos` : "Respuesta sin listado",
    sample: summarizeRecord(source),
  };
}

async function loadEndpointCard(card) {
  try {
    const payload = await apiRequest(card.endpoint, { params: card.params });

    return {
      ...card,
      status: getListPayload(payload).length || payload ? "available" : "empty",
      ...summarizePayload(payload),
    };
  } catch (error) {
    return {
      ...card,
      count: "0",
      detail: "No disponible",
      sample: `${buildApiUrl(card.endpoint, card.params)} - ${error.message}`,
      status: "error",
    };
  }
}

export function getDashboardEndpointCards() {
  return Promise.all(dashboardEndpointCards.map(loadEndpointCard));
}
