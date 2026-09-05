import { apiRequest, getListPayload } from "../../../services/apiService";

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

function normalizeAmount(value) {
  return Number(value || 0);
}

async function safeRequest(path, options) {
  try {
    return await apiRequest(path, options);
  } catch {
    return null;
  }
}

function percentOfMax(value, max) {
  if (!max) return 0;
  return Math.max(8, Math.round((value / max) * 100));
}

function normalizeMonthlySales(records) {
  if (!records.length) return dashboardData.monthlySales;

  return {
    labels: records.map((record, index) => {
      const month = firstValue(record, ["mes", "month", "periodo", "fecha"], "");
      const year = firstValue(record, ["anio", "year"], "");

      if (month && year) return `${month} ${year}`;
      return month ? String(month) : dashboardData.monthlySales.labels[index] || `Mes ${index + 1}`;
    }),
    values: records.map((record) =>
      normalizeAmount(firstValue(record, ["total_facturado", "monto_total", "total", "ventas", "facturado", "amount"], 0)),
    ),
  };
}

function normalizeTopClients(records) {
  if (!records.length) return dashboardData.topClients;

  const mapped = records.slice(0, 10).map((record) => {
    const amount = normalizeAmount(
      firstValue(record, ["monto_total", "total_compras", "total", "total_comprado", "amount"], 0),
    );

    return [
      firstValue(record, ["nombre", "nombre_cliente", "cliente", "name"], "Cliente"),
      formatCurrency(amount),
      amount,
    ];
  });
  const max = Math.max(...mapped.map(([, , amount]) => amount), 1);

  return mapped.map(([name, amountLabel, amount]) => [name, amountLabel, percentOfMax(amount, max)]);
}

function normalizeTopProducts(records) {
  if (!records.length) return dashboardData.topProducts;

  const mapped = records.slice(0, 10).map((record) => {
    const units = normalizeAmount(firstValue(record, ["unidades", "cantidad", "vendidos", "total_vendido"], 0));
    const amount = normalizeAmount(firstValue(record, ["monto_total", "total", "ingresos", "revenue"], 0));

    return [
      firstValue(record, ["nombre", "nombre_producto", "producto", "name"], "Producto"),
      `${formatCount(units)} u - ${formatCurrency(amount)}`,
      units,
    ];
  });
  const max = Math.max(...mapped.map(([, , units]) => units), 1);

  return mapped.map(([name, label, units]) => [name, label, percentOfMax(units, max)]);
}

function normalizeCategoryShare(records) {
  if (!records.length) return dashboardData.categoryShare;

  const colors = ["#00288e", "#5bcf9e", "#dae2fd", "#bec6e0", "#1e40af", "#68dba9"];

  return records.slice(0, 6).map((record, index) => [
    firstValue(record, ["categoria", "nombre_categoria", "nombre", "category"], "Categoria"),
    normalizeAmount(firstValue(record, ["porcentaje", "participacion", "share", "value"], 0)),
    firstValue(record, ["color"], colors[index % colors.length]),
  ]);
}

function normalizeCardBrands(records) {
  if (!records.length) return dashboardData.cardBrands;

  return records.slice(0, 6).map((record) => {
    const brand = firstValue(record, ["marca", "nombre_marca", "brand", "nombre"], "Marca");
    const percentage = normalizeAmount(firstValue(record, ["porcentaje", "participacion", "share", "value"], 0));
    const total = firstValue(record, ["total", "cantidad", "transacciones"], 0);

    return [brand, String(brand).slice(0, 4).toUpperCase(), `${percentage}% (${formatCount(total)} u)`, percentage];
  });
}

function normalizePaymentTypes(records) {
  if (!records.length) return dashboardData.paymentTypes;

  const colors = ["#1e40af", "#68dba9"];

  return records.slice(0, 2).map((record, index) => [
    firstValue(record, ["tipo", "tipo_tarjeta", "modalidad", "label"], index === 0 ? "Credito" : "Debito"),
    normalizeAmount(firstValue(record, ["porcentaje", "participacion", "share", "value"], 0)),
    colors[index],
  ]);
}

function buildKpis({ averagePayload, compras, monthlySales, topClients }) {
  const averageSource = Array.isArray(averagePayload) ? averagePayload[0] : averagePayload;
  const totalCompras = Number(firstValue(averageSource, ["total_compras", "compras_total", "count"], compras.length));
  const montoTotal = monthlySales.values.reduce((sum, value) => sum + Number(value || 0), 0);
  const average = firstValue(averageSource, [
    "promedio_compra",
    "ticket_promedio",
    "promedio",
    "avg",
    "average",
  ], 0);

  return {
    ...dashboardData.kpis,
    totalCompras: {
      ...dashboardData.kpis.totalCompras,
      value: formatCount(totalCompras),
      trend: totalCompras ? "API activa" : "0 registros",
    },
    clientesConCompras: {
      ...dashboardData.kpis.clientesConCompras,
      value: formatCount(topClients.length),
      trend: "top consumo",
    },
    montoTotalVendido: {
      ...dashboardData.kpis.montoTotalVendido,
      value: montoTotal ? formatCurrency(montoTotal) : dashboardData.kpis.montoTotalVendido.value,
      trend: "por mes",
    },
    ticketPromedio: {
      ...dashboardData.kpis.ticketPromedio,
      value: formatCurrency(average),
      trend: "API promedio",
    },
  };
}

function buildModules({ categoryShare, compras, paymentTypes, topClients, topProducts }) {
  return dashboardData.modules.map((module) => {
    if (module.name === "Clientes") {
      return {
        ...module,
        stats: [
          ["Top visibles", formatCount(topClients.length)],
          ["Mayor consumo", topClients[0]?.[0] || "Sin datos"],
          ["Origen", "/api/clientes/top10"],
        ],
      };
    }

    if (module.name === "Productos") {
      return {
        ...module,
        stats: [
          ["Top visibles", formatCount(topProducts.length)],
          ["Mas vendido", topProducts[0]?.[0] || "Sin datos"],
          ["Origen", "/api/productos/top10"],
        ],
      };
    }

    if (module.name === "Categorias") {
      return {
        ...module,
        stats: [
          ["Categorias", formatCount(categoryShare.length)],
          ["Mayor participacion", categoryShare[0]?.[0] || "Sin datos"],
          ["Origen", "/api/productos/por-categoria"],
        ],
      };
    }

    if (module.name === "Compras") {
      return {
        ...module,
        stats: [
          ["Total ordenes", formatCount(compras.length)],
          ["Endpoint", "/api/compras"],
          ["Estado", compras.length ? "Datos API" : "Sin registros"],
        ],
      };
    }

    if (module.name === "Tarjetas") {
      return {
        ...module,
        stats: [
          ["Tipos", formatCount(paymentTypes.length)],
          ["Principal", paymentTypes[0]?.[0] || "Sin datos"],
          ["Origen", "/api/tarjetas/credito-vs-debito"],
        ],
      };
    }

    return module;
  });
}

export async function getDashboardData(params = {}) {
  const [
    comprasPayload,
    monthlyPayload,
    averagePayload,
    topClientsPayload,
    topProductsPayload,
    categoryPayload,
    cardBrandsPayload,
    paymentTypesPayload,
  ] = await Promise.all([
    safeRequest("/api/compras", { params: { limit: 50, offset: 0, ...params } }),
    safeRequest("/api/compras/por-mes", params?.anio ? { params: { anio: params.anio } } : undefined),
    safeRequest("/api/compras/promedio", { params }),
    safeRequest("/api/clientes/top10", { params: { limit: 10 } }),
    safeRequest("/api/productos/top10", { params: { limit: 10 } }),
    safeRequest("/api/productos/por-categoria"),
    safeRequest("/api/tarjetas/por-marca"),
    safeRequest("/api/tarjetas/credito-vs-debito"),
  ]);

  const compras = getListPayload(comprasPayload);
  const monthlySales = normalizeMonthlySales(getListPayload(monthlyPayload));
  const topClients = normalizeTopClients(getListPayload(topClientsPayload));
  const topProducts = normalizeTopProducts(getListPayload(topProductsPayload));
  const categoryShare = normalizeCategoryShare(getListPayload(categoryPayload));
  const cardBrands = normalizeCardBrands(getListPayload(cardBrandsPayload));
  const paymentTypes = normalizePaymentTypes(getListPayload(paymentTypesPayload));

  return {
    ...dashboardData,
    kpis: buildKpis({ averagePayload, compras, monthlySales, topClients }),
    modules: buildModules({ categoryShare, compras, paymentTypes, topClients, topProducts }),
    monthlySales,
    topClients,
    topProducts,
    categoryShare,
    cardBrands,
    paymentTypes,
    hasApiData:
      compras.length > 0 ||
      topClients.length > 0 ||
      topProducts.length > 0 ||
      categoryShare.length > 0 ||
      cardBrands.length > 0 ||
      paymentTypes.length > 0,
  };
}

export function getDashboardMockData() {
  return dashboardData;
}
