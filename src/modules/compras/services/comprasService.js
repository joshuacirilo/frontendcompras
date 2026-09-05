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

export function getComprasData() {
  return comprasData;
}
