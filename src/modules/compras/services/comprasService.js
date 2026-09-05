import { apiRequest, getListPayload } from "../../../services/apiService";

const comprasData = {
  filters: {
    clientes: [
      "Todos los clientes",
      "Corporacion Alimentos SA",
      "Manuel Estrada Gomez",
      "Logistica Panamericana",
      "Ferreterias del Sur",
    ],
    productos: [
      "Todos los productos",
      "Cafe Premium 500g",
      "Aceite Vegetal 1L",
      "Arroz Blanco Precocido 1kg",
      "Detergente Multiuso 2.5kg",
    ],
    categorias: [
      "Todas las categorias",
      "Alimentos & Bebidas",
      "Hogar & Limpieza",
      "Servicios Institucionales",
      "Ferreteria Ligera",
    ],
  },
  kpis: [
    {
      label: "Total de Compras",
      value: "12,540",
      badge: "+8.4%",
      badgeIcon: "trending_up",
      detail: "Transacciones registradas",
      footerLeft: "98.2% exito",
      progress: 78,
    },
    {
      label: "Monto Total Vendido",
      value: "Q 980,450.00",
      badge: "+14.2%",
      badgeIcon: "arrow_upward",
      detail: "Facturado neto acumulado",
      footerLeft: "Meta: Q 860,000",
      footerRight: "Superada",
      highlighted: true,
    },
    {
      label: "Ticket Promedio",
      value: "Q 78.14",
      badge: "+Q 4.20",
      detail: "Por canasta de compra",
      footerLeft: "Canasta regular: 3.8 SKUs",
      footerRight: "Mediana: Q 64.00",
    },
    {
      label: "Mes Mayor Facturacion",
      value: "Marzo 2024",
      badge: "Record",
      badgeIcon: "military_tech",
      detail: "Q 365,000.00 en 31 dias",
      footerLeft: "Aporte al global",
      footerRight: "37.2% total",
      success: true,
    },
  ],
  monthlySales: {
    labels: ["Abr 23", "May 23", "Jun 23", "Jul 23", "Ago 23", "Sep 23", "Oct 23", "Nov 23", "Dic 23", "Ene 24", "Mar 24", "Actual"],
    values: [95000, 112000, 134000, 128000, 168000, 162000, 218000, 205000, 268000, 318000, 365000, 332000],
  },
  yearlySales: [
    { year: "2024 (Acumulado Q1)", amount: "Q 980,450.00", percent: 82, trend: "+26.8% vs 2023", tone: "primary" },
    { year: "2023 (Cierre Anual)", amount: "Q 773,200.00", percent: 65, trend: "+18.3%", tone: "secondary" },
    { year: "2022 (Ano Base)", amount: "Q 653,800.00", percent: 55, tone: "muted" },
  ],
  peakMonth: {
    title: "Detalle Pico: Marzo 2024",
    badge: "Historico",
    description:
      "El 28 de marzo registro una concentracion de 4,120 transacciones por la campana corporativa de cierre fiscal de temporada.",
    stats: [
      ["Dia Pico (28 Mar)", "Q 68,490.00"],
      ["Tickets Procesados", "842 reqs/h"],
    ],
  },
  peakHours: [
    ["Manana (08:00 - 12:00)", 34, "primary"],
    ["Tarde (12:00 - 17:00)", 51, "tertiary"],
  ],
  purchases: [
    ["#TRX-9482", "17/03/2024 15:42", "Corporacion Alimentos SA", "NIT: 893421-2", "Q 1,450.00", "Visa **** 4821", "credit_card", "Completada"],
    ["#TRX-9481", "17/03/2024 14:18", "Manuel Estrada Gomez", "Cliente Frecuente (Gold)", "Q 320.50", "MC **** 1093", "contactless", "Completada"],
    ["#TRX-9480", "17/03/2024 13:02", "Logistica Panamericana", "Factura Especial", "Q 5,890.00", "ACH Banco Industrial", "account_balance", "Procesando"],
    ["#TRX-9479", "17/03/2024 11:45", "Ferreterias del Sur", "NIT: 541092-K", "Q 740.00", "Visa **** 9920", "credit_card", "Completada"],
    ["#TRX-9478", "17/03/2024 10:12", "Valeria Soto M.", "Cliente Final", "Q 185.00", "Visa **** 7711", "credit_card", "Cancelada"],
    ["#TRX-9477", "16/03/2024 19:30", "Servicios Medicos Central", "Institucion Afiliada", "Q 2,120.00", "MC **** 5562", "credit_card", "Completada"],
  ],
};

const currencyFormatter = new Intl.NumberFormat("es-GT", {
  currency: "GTQ",
  style: "currency",
});

function firstValue(record, keys, fallback = "") {
  for (const key of keys) {
    if (record?.[key] !== undefined && record?.[key] !== null) return record[key];
  }

  return fallback;
}

function formatCurrency(value) {
  const number = Number(value || 0);

  return currencyFormatter.format(number).replace("GTQ", "Q").trim();
}

function formatCount(value) {
  return Number(value || 0).toLocaleString("es-GT");
}

function monthLabel(record, index) {
  const rawMonth = firstValue(record, ["mes", "month", "periodo", "fecha"], "");
  const rawYear = firstValue(record, ["anio", "year"], "");

  if (rawMonth && rawYear) return `${rawMonth} ${rawYear}`;
  if (rawMonth) return String(rawMonth);

  return comprasData.monthlySales.labels[index] || `Mes ${index + 1}`;
}

function normalizeMonthlySales(records) {
  if (!records.length) return comprasData.monthlySales;

  return {
    labels: records.map(monthLabel),
    values: records.map((record) =>
      Number(firstValue(record, ["monto_total", "total", "ventas", "facturado", "amount"], 0)),
    ),
  };
}

function normalizeYearlySales(records) {
  if (!records.length) return comprasData.yearlySales;

  const maxAmount = Math.max(
    ...records.map((record) => Number(firstValue(record, ["monto_total", "total", "ventas", "facturado", "amount"], 0))),
    1,
  );

  return records.map((record, index) => {
    const amount = Number(firstValue(record, ["monto_total", "total", "ventas", "facturado", "amount"], 0));
    const year = firstValue(record, ["anio", "year"], `Ano ${index + 1}`);

    return {
      year: String(year),
      amount: formatCurrency(amount),
      percent: Math.max(8, Math.round((amount / maxAmount) * 100)),
      trend: firstValue(record, ["tendencia", "trend", "variacion"], ""),
      tone: index === 0 ? "primary" : index === 1 ? "secondary" : "muted",
    };
  });
}

function normalizePurchase(record) {
  const id = firstValue(record, ["id_compra", "id", "compra", "numero_compra"], "N/D");
  const date = firstValue(record, ["fecha", "fecha_compra", "created_at"], "Sin fecha");
  const client = firstValue(record, ["cliente", "nombre_cliente", "nombre"], "Cliente sin nombre");
  const detail = firstValue(record, ["nit", "identificador", "detalle", "tipo_cliente"], "Detalle no disponible");
  const amount = firstValue(record, ["monto_total", "total", "importe", "amount"], 0);
  const card = firstValue(record, ["tarjeta", "metodo_pago", "forma_pago"], "Metodo no disponible");
  const status = firstValue(record, ["estado", "status"], "Completada");

  return [
    String(id).startsWith("#") ? String(id) : `#${id}`,
    String(date),
    String(client),
    String(detail),
    formatCurrency(amount),
    String(card),
    String(card).toLowerCase().includes("ach") ? "account_balance" : "credit_card",
    String(status),
  ];
}

function normalizeAverage(payload) {
  const source = Array.isArray(payload) ? payload[0] : payload;
  const average = firstValue(source, ["ticket_promedio", "promedio", "avg", "average"], 0);
  const median = firstValue(source, ["mediana", "median"], null);
  const basket = firstValue(source, ["canasta_promedio", "skus_promedio", "items_promedio"], null);

  return {
    value: formatCurrency(average),
    summary: `${formatCurrency(average)} por compra${
      median ? `, mediana ${formatCurrency(median)}` : ""
    }${basket ? ` y canasta regular de ${basket} SKUs` : ""}.`,
  };
}

function buildKpis({ average, monthlySales, purchases, yearlySales }) {
  const totalPurchases = purchases.length;
  const totalSold = yearlySales.reduce((sum, item) => {
    const amount = Number(String(item.amount).replace(/[^\d.]/g, ""));
    return sum + amount;
  }, 0);
  const peakValue = Math.max(...monthlySales.values, 0);
  const peakIndex = monthlySales.values.indexOf(peakValue);
  const peakLabel = monthlySales.labels[peakIndex] || comprasData.kpis[3].value;

  return comprasData.kpis.map((kpi) => {
    if (kpi.label === "Total de Compras") {
      return { ...kpi, value: formatCount(totalPurchases) };
    }

    if (kpi.label === "Monto Total Vendido") {
      return { ...kpi, value: totalSold ? formatCurrency(totalSold) : kpi.value };
    }

    if (kpi.label === "Ticket Promedio") {
      return { ...kpi, value: average.value };
    }

    if (kpi.label === "Mes Mayor Facturacion") {
      return {
        ...kpi,
        value: peakLabel,
        detail: peakValue ? `${formatCurrency(peakValue)} en el periodo` : kpi.detail,
      };
    }

    return kpi;
  });
}

export function getCompras(params) {
  return apiRequest("/api/compras", { params });
}

export function getCompraById(idCompra) {
  return apiRequest(`/api/compras/${idCompra}`);
}

export function getDetalleCompras(params) {
  return apiRequest("/api/detalle-compras", { params });
}

export function getDetalleCompraById(idDetalle) {
  return apiRequest(`/api/detalle-compras/${idDetalle}`);
}

export function getComprasPorMes(params) {
  return apiRequest("/api/compras/por-mes", { params });
}

export function getComprasPorAnio(params) {
  return apiRequest("/api/compras/por-anio", { params });
}

export function getComprasPromedio(params) {
  return apiRequest("/api/compras/promedio", { params });
}

export async function getComprasData(params = {}) {
  const [comprasPayload, monthlyPayload, yearlyPayload, averagePayload] = await Promise.all([
    getCompras({ limit: 50, offset: 0, ...params }),
    getComprasPorMes(params?.anio ? { anio: params.anio } : undefined),
    getComprasPorAnio(),
    getComprasPromedio(params),
  ]);

  const purchases = getListPayload(comprasPayload).map(normalizePurchase);
  const monthlySales = normalizeMonthlySales(getListPayload(monthlyPayload));
  const yearlySales = normalizeYearlySales(getListPayload(yearlyPayload));
  const average = normalizeAverage(averagePayload);

  return {
    ...comprasData,
    kpis: buildKpis({ average, monthlySales, purchases, yearlySales }),
    monthlySales,
    yearlySales,
    purchases,
    ticketAverageSummary: average.summary,
  };
}

export function getComprasMockData() {
  return comprasData;
}
