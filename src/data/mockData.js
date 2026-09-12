/** Datos de demostracion usados solo si un endpoint no responde. */

export const mockDashboard = {
  kpis: {
    totalCompras: {
      label: "Total compras",
      value: "12,540",
      icon: "shopping_cart",
      trend: "Mock",
      detail: "Demo (API no respondio)",
    },
    clientesConCompras: {
      label: "Clientes con compras",
      value: "3,420",
      icon: "groups",
      trend: "Mock",
      detail: "Demo (API no respondio)",
    },
    montoTotalVendido: {
      label: "Monto total vendido",
      value: "Q 980,450.00",
      icon: "monetization_on",
      trend: "Mock",
      detail: "Demo (API no respondio)",
      highlighted: true,
    },
    ticketPromedio: {
      label: "Ticket promedio",
      value: "Q 78.14",
      icon: "receipt",
      trend: "Mock",
      detail: "Demo (API no respondio)",
    },
  },
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
    ["Cafe Premium 500g", "3,120 u - Q 156,000.00", 100],
    ["Aceite Vegetal 1L", "2,840 u - Q 99,400.00", 88],
    ["Arroz Blanco Precocido 1kg", "2,310 u - Q 46,200.00", 74],
    ["Leche Entera Deslactosada 1L", "1,950 u - Q 39,000.00", 62],
    ["Detergente Multiuso 2.5kg", "1,620 u - Q 56,700.00", 52],
    ["Harina de Trigo Fortificada 1kg", "1,400 u - Q 21,000.00", 44],
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

export const mockClientes = {
  topByAmount: [
    ["Distribuidora Central S.A.", 45210],
    ["Corporacion Alimentos GT", 38940],
    ["Farmacias del Valle", 32180],
    ["Supertiendas Unidas", 27850],
    ["Hoteles Maya", 24190],
    ["Abastecedora Metro", 20400],
    ["Claudia Morales", 14890],
    ["Jorge Galindo", 9450],
    ["Sofia Pineda", 8120],
    ["Ana Dominguez", 6340],
  ],
  topByPurchases: [
    ["Distribuidora Central S.A.", 142],
    ["Farmacias del Valle", 118],
    ["Supertiendas Unidas", 97],
    ["Corporacion Alimentos GT", 84],
    ["Hoteles Maya", 76],
    ["Abastecedora Metro", 48],
    ["Claudia Morales", 32],
    ["Sofia Pineda", 21],
    ["Jorge Galindo", 18],
    ["Ana Dominguez", 14],
  ],
  inactiveClients: [
    ["CL-00960", "Lucia Reyes Gomez", "Femenino", "Sin compras"],
    ["CL-00912", "Marcos Rivas Ochoa", "Masculino", "Sin compras"],
    ["CL-00844", "Servicios La Reforma", "Corporativo", "Sin compras"],
    ["CL-00791", "Patricia Velasquez", "Femenino", "Sin compras"],
  ],
  genderShare: [
    ["Corporativo", 52, "#00288e"],
    ["Femenino", 28, "#68dba9"],
    ["Masculino", 17, "#bec6e0"],
    ["Otro", 3, "#dce9ff"],
  ],
};

export const mockProductos = {
  topSold: [
    ["Cafe Coban 500g", "Cafe Especial Coban 500g", 1425, 100],
    ["Aceite Vegetal 1L", "Aceite Vegetal 1L", 1254, 88],
    ["Arroz Grano 1kg", "Arroz Blanco Grano Entero 1kg", 1168, 82],
    ["Leche Entera 1L", "Leche Entera UHT 1L", 1050, 74],
    ["Azucar Blanca 2.5kg", "Azucar Blanca Especial 2.5kg", 970, 68],
    ["Pasta Spaghetti 400g", "Pasta Spaghetti 400g", 885, 62],
    ["Detergente 1.5kg", "Detergente En Polvo 1.5kg", 784, 55],
    ["Frijol Negro 900g", "Frijol Negro Seleccion 900g", 726, 51],
    ["Jabon Tocador x3", "Jabon de Tocador Pack x3", 627, 44],
    ["Cereal Maiz 500g", "Cereal de Maiz Tostado 500g", 555, 39],
  ],
  topRevenue: [
    ["Cafe Coban", 68400, 42600],
    ["Aceite Veg.", 52668, 27600],
    ["Detergente", 41160, 21600],
    ["Vino Reserva", 36800, 25300],
    ["Leche UHT", 31500, 14500],
  ],
  neverPurchased: [
    ["SKU-9021", "Te Verde Jazmin 20s", "Bebidas", "12 Ene 2024", "Q 34.50"],
    ["SKU-8840", "Salsa Trufa Negra 180g", "Gourmet", "20 Dic 2023", "Q 115.00"],
    ["SKU-7721", "Aceite de Nuez 250ml", "Despensa", "05 Feb 2024", "Q 88.00"],
    ["SKU-6512", "Shampoo Organico Romero", "Cuidado", "18 Ene 2024", "Q 62.00"],
  ],
};

export const mockCategorias = {
  mostConsumed: {
    name: "Alimentos & Bebidas",
    code: "CAT-ALM01",
    amount: "Q 416,691.00",
    purchases: "1,465",
    share: 42.5,
    trend: "Mock · API no respondio",
    icon: "restaurant",
  },
  leastConsumed: {
    name: "Cuidado del Calzado",
    code: "CAT-CAL07",
    amount: "Q 4,120.00",
    purchases: "97",
    share: 0.42,
    trend: "Mock · API no respondio",
    icon: "roller_skating",
  },
  participation: [
    { category: "Alimentos & Bebidas", value: 42.5, color: "#00288e" },
    { category: "Abarrotes y Granos", value: 24.2, color: "#1e40af" },
    { category: "Limpieza & Hogar", value: 14.6, color: "#5bcf9e" },
    { category: "Cuidado Personal", value: 11.8, color: "#68dba9" },
    { category: "Oficina y Papeleria", value: 3.9, color: "#bec6e0" },
    { category: "Indumentaria & Cuero", value: 2.6, color: "#dae2fd" },
    { category: "Cuidado del Calzado", value: 0.42, color: "#ba1a1a" },
  ],
};

export const mockCompras = {
  monthlySales: {
    labels: ["Abr 23", "May 23", "Jun 23", "Jul 23", "Ago 23", "Sep 23", "Oct 23", "Nov 23", "Dic 23", "Ene 24", "Mar 24", "Actual"],
    values: [95000, 112000, 134000, 128000, 168000, 162000, 218000, 205000, 268000, 318000, 365000, 332000],
  },
  yearlySales: [
    { year: "2024 (Acumulado)", amount: "Q 980,450.00", percent: 82, trend: "Mock", tone: "primary" },
    { year: "2023 (Cierre)", amount: "Q 773,200.00", percent: 65, trend: "Mock", tone: "secondary" },
    { year: "2022 (Base)", amount: "Q 653,800.00", percent: 55, tone: "muted" },
  ],
  peakMonth: {
    title: "Mes mayor facturacion: Marzo 2024",
    badge: "Mock",
    description: "Dato de demostracion porque /api/compras/por-mes no respondio.",
    stats: [
      ["Periodo", "Marzo 2024"],
      ["Monto", "Q 365,000.00"],
      ["Puntos en serie", "12"],
    ],
  },
  ticketAverageSummary: "Q 78.14 por compra (mock · API no respondio).",
};

export const mockTarjetas = {
  mostUsedBrand: {
    brand: "Visa",
    share: 58,
    transactions: "6,565",
    volume: "Q 568,662.00",
    approval: "99.4%",
    detail: "Mock · API no respondio.",
  },
  creditDebit: [
    ["Credito", 64, "#00288e"],
    ["Debito", 36, "#68dba9"],
  ],
  topClients: [
    {
      initials: "DC",
      client: "Distribuidora Central S.A.",
      type: "Credito Empresarial",
      card: "Visa **** 4381",
      amount: "Q 64,820.00",
      orders: "82 ordenes",
    },
    {
      initials: "SA",
      client: "Supertiendas Aurora",
      type: "Credito Corporativo",
      card: "Mastercard **** 1284",
      amount: "Q 48,960.00",
      orders: "63 ordenes",
    },
    {
      initials: "FG",
      client: "Farmacias del Golfo S.A.",
      type: "Debito Inmediato",
      card: "Visa **** 8831",
      amount: "Q 21,450.00",
      orders: "35 ordenes",
    },
  ],
};

export async function settleOrMock(promise, mockValue, sourceName, mockFlags) {
  try {
    const value = await promise;
    return { value, usedMock: false };
  } catch (error) {
    mockFlags.push(`${sourceName}: ${error.message}`);
    return { value: mockValue, usedMock: true };
  }
}
