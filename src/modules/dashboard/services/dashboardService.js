const dashboardData = {
  kpis: {
    totalCompras: {
      label: "Total compras",
      value: "12,540",
      icon: "shopping_cart",
      trend: "8.4%",
      detail: "vs periodo ant.",
    },
    clientesConCompras: {
      label: "Clientes con compras",
      value: "3,420",
      icon: "groups",
      trend: "78% activo",
      detail: "sobre base total",
    },
    montoTotalVendido: {
      label: "Monto total vendido",
      value: "Q 980,450.00",
      icon: "monetization_on",
      trend: "14.2%",
      detail: "meta trimestral",
      highlighted: true,
    },
    ticketPromedio: {
      label: "Ticket promedio",
      value: "Q 78.14",
      icon: "receipt",
      trend: "+Q 4.20",
      detail: "por transaccion",
    },
  },
  filters: {
    clientes: [
      "Todos los clientes",
      "Distribuidora Central S.A.",
      "Supertiendas Aurora",
      "Corporacion El Roble",
      "Abastecedora Metropolitana",
    ],
    categorias: [
      "Todas las categorias",
      "Alimentos & Bebidas",
      "Lacteos & Derivados",
      "Hogar & Limpieza",
      "Cuidado Personal",
      "Ferreteria Ligera",
    ],
    productos: [
      "Todos los productos",
      "Cafe Premium 500g",
      "Aceite Vegetal 1L",
      "Arroz Blanco Precocido 1kg",
      "Detergente Multiuso 2.5kg",
    ],
  },
  modules: [
    {
      name: "Clientes",
      tag: "Clientes",
      icon: "person_pin",
      stats: [
        ["Registrados", "4,380"],
        ["Mayor consumo", "Distribuidora Central (Q 45k)"],
        ["Sin compras", "960 clientes"],
      ],
    },
    {
      name: "Productos",
      tag: "Catalogo",
      icon: "inventory_2",
      stats: [
        ["Registrados", "1,240"],
        ["Mas vendido", "Cafe Premium (3,120 u)"],
        ["Sin rotacion", "48 productos"],
      ],
    },
    {
      name: "Categorias",
      tag: "Lineas",
      icon: "category",
      stats: [
        ["Categorias", "18 activas"],
        ["Mas consumida", "Alimentos & Bebidas"],
        ["Participacion", "42.5% del total"],
      ],
    },
    {
      name: "Compras",
      tag: "Ventas",
      icon: "point_of_sale",
      stats: [
        ["Total ordenes", "12,540"],
        ["Total facturado", "Q 980,450.00"],
        ["Pico mensual", "Marzo (Q 365k)"],
      ],
    },
    {
      name: "Tarjetas",
      tag: "Pagos",
      icon: "credit_card",
      stats: [
        ["Registradas", "2,890 u"],
        ["Marca principal", "Visa (58%)"],
        ["Cred vs Deb", "64% / 36%"],
      ],
    },
  ],
  monthlySales: {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    values: [95000, 134000, 182000, 218000, 365000, 245000, 268000, 292000, 318000, 332000, 354000, 372000],
  },
  topClients: [
    ["Distribuidora Central S.A.", "Q 45,210.00", 100],
    ["Supertiendas Aurora", "Q 38,940.00", 86],
    ["Operadora de Hoteles Maya", "Q 32,150.00", 71],
    ["Corporacion El Roble", "Q 27,800.00", 61],
    ["Abastecedora Metropolitana", "Q 24,190.00", 53],
    ["Restaurantes del Valle", "Q 20,400.00", 45],
  ],
  topProducts: [
    ["Cafe Premium 500g", "3,120 u - Q 156,000", 100],
    ["Aceite Vegetal 1L", "2,840 u - Q 99,400", 88],
    ["Arroz Blanco Precocido 1kg", "2,310 u - Q 46,200", 74],
    ["Leche Entera Deslactosada 1L", "1,950 u - Q 39,000", 62],
    ["Detergente Multiuso 2.5kg", "1,620 u - Q 56,700", 52],
    ["Harina de Trigo Fortificada 1kg", "1,400 u - Q 21,000", 44],
  ],
  categoryShare: [
    ["Alimentos", 42.5, "#00288e"],
    ["Lacteos", 25, "#5bcf9e"],
    ["Hogar", 18, "#dae2fd"],
    ["Otros", 14.5, "#bec6e0"],
  ],
  cardBrands: [
    ["Visa Internacional", "VISA", "58% (1,676 u)", 58],
    ["Mastercard", "MC", "32% (925 u)", 32],
    ["American Express", "AX", "7% (202 u)", 7],
    ["Otras locales", "OT", "3% (87 u)", 3],
  ],
  paymentTypes: [
    ["Tarjetas de Credito", 64, "#1e40af"],
    ["Tarjetas de Debito", 36, "#68dba9"],
  ],
};

export function getDashboardData() {
  return dashboardData;
}
