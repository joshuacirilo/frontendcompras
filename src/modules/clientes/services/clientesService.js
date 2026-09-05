import { apiRequest, getListPayload } from "../../../services/apiService";

const clientesData = {
  filters: {
    fechas: ["Ultimos 30 dias", "Trimestre Actual (Q2)", "Ano Fiscal 2024", "Personalizado"],
    clientes: [
      "Todos los clientes",
      "Distribuidora Central S.A.",
      "Corporacion Alimentos GT",
      "Farmacias del Valle",
      "Supertiendas Unidas",
    ],
    segmentos: ["Todos los segmentos", "VIP / Mayorista", "Frecuente B2C", "Esporadico", "Riesgo de fuga"],
    consumos: ["Cualquier monto", "> Q 20,000", "Q 5,000 - Q 20,000", "< Q 5,000", "Sin consumo"],
    generos: ["Todos", "Femenino", "Masculino", "Corporativo / Otro"],
    estados: ["Todos", "Activo", "Inactivo"],
  },
  kpis: [
    {
      label: "Total de Clientes",
      value: "4,380",
      icon: "group",
      tone: "primary",
      trend: "+4.6% vs mes anterior",
      detail: "Base total registrada en ERP",
    },
    {
      label: "Clientes con Compras",
      value: "3,420",
      icon: "shopping_bag",
      tone: "tertiary",
      trend: "78% de la base activa",
      detail: "Compraron dentro del periodo",
    },
    {
      label: "Clientes sin Compras",
      value: "960",
      icon: "person_off",
      tone: "error",
      trend: "22% requiere seguimiento",
      detail: "Cuentas registradas sin consumo",
    },
    {
      label: "Mayor Consumo",
      value: "Q 45,210.00",
      icon: "workspace_premium",
      tone: "primary",
      trend: "Distribuidora Central S.A.",
      detail: "Cliente lider del periodo",
      highlighted: true,
    },
  ],
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
  genderShare: [
    ["Corporativo", 52, "#00288e"],
    ["Femenino", 28, "#68dba9"],
    ["Masculino", 17, "#bec6e0"],
    ["Otro", 3, "#dce9ff"],
  ],
  inactiveClients: [
    ["CL-00960", "Lucia Reyes Gomez", "Femenino", "Inactivo"],
    ["CL-00912", "Marcos Rivas Ochoa", "Masculino", "Inactivo"],
    ["CL-00844", "Servicios La Reforma", "Corporativo", "Inactivo"],
    ["CL-00791", "Patricia Velasquez", "Femenino", "Inactivo"],
  ],
  clients: [
    ["DC", "Distribuidora Central S.A.", "distribuidora@central.gt", "3948201-4", "Corporativo", "Q 45,210.00", "142 pedidos", "Hoy, 10:45 AM", "Activo"],
    ["CA", "Corporacion Alimentos GT", "compras@alimentosgt.com", "1049283-9", "Corporativo", "Q 38,940.00", "84 pedidos", "Ayer, 04:20 PM", "Activo"],
    ["FV", "Farmacias del Valle", "valle.logistica@farmacias.gt", "5829104-1", "Corporativo", "Q 32,180.50", "118 pedidos", "14 May 2024", "Activo"],
    ["CM", "Claudia Maria Morales Solis", "claudia.morales@gmail.com", "2948102940101", "Femenino", "Q 14,890.00", "32 pedidos", "12 May 2024", "Activo"],
    ["JG", "Jorge Galindo Figueroa", "jgalindo@outlook.com", "1938402910102", "Masculino", "Q 9,450.00", "18 pedidos", "10 May 2024", "Activo"],
    ["LR", "Lucia Reyes Gomez", "lucia.reyes@yahoo.es", "4829103-2", "Femenino", "Q 0.00", "0 pedidos", "Sin compras", "Inactivo"],
    ["SP", "Sofia Pineda Carrillo", "sofi_pineda@gmail.com", "2039485910101", "Femenino", "Q 8,120.00", "21 pedidos", "08 May 2024", "Activo"],
    ["MR", "Marcos Rivas Ochoa", "mrivas@corporativagt.com", "8392019-K", "Masculino", "Q 0.00", "0 pedidos", "Sin compras", "Inactivo"],
    ["AD", "Ana Dominguez Estrada", "adominguez@soluciones.com", "3029481920101", "Femenino", "Q 6,340.25", "14 pedidos", "02 May 2024", "Activo"],
    ["SU", "Supertiendas Unidas", "proveedores@supertiendas.gt", "7192834-8", "Corporativo", "Q 27,850.00", "97 pedidos", "29 Abr 2024", "Activo"],
  ],
};

const currencyFormatter = new Intl.NumberFormat("es-GT", {
  currency: "GTQ",
  style: "currency",
});

function firstValue(record, keys, fallback = "") {
  for (const key of keys) {
    if (record?.[key] !== undefined && record?.[key] !== null) {
      return record[key];
    }
  }

  return fallback;
}

function initialsFromName(name) {
  return String(name)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function formatCurrency(value) {
  const number = Number(value || 0);

  return currencyFormatter.format(number).replace("GTQ", "Q").trim();
}

function normalizeClient(record) {
  const name = firstValue(record, ["nombre", "nombre_cliente", "cliente", "name"], "Cliente sin nombre");
  const email = firstValue(record, ["email", "correo", "correo_cliente"], "sin-correo@local");
  const nit = firstValue(record, ["nit", "dpi", "identificador", "id_cliente"], "N/D");
  const gender = firstValue(record, ["genero", "sexo", "segmento"], "N/D");
  const total = firstValue(record, ["total_compras", "monto_total", "total", "total_comprado"], 0);
  const frequency = firstValue(record, ["frecuencia", "cantidad_compras", "pedidos", "compras"], 0);
  const lastPurchase = firstValue(record, ["ultima_compra", "fecha_ultima_compra"], "Sin compras");
  const status = Number(total) > 0 || Number(frequency) > 0 ? "Activo" : "Inactivo";

  return [
    initialsFromName(name),
    name,
    email,
    String(nit),
    String(gender),
    formatCurrency(total),
    `${frequency} pedidos`,
    String(lastPurchase),
    status,
  ];
}

function normalizeTopByAmount(record) {
  return [
    firstValue(record, ["nombre", "nombre_cliente", "cliente", "name"], "Cliente"),
    Number(firstValue(record, ["monto_total", "total_compras", "total", "total_comprado"], 0)),
  ];
}

function normalizeTopByPurchases(record) {
  return [
    firstValue(record, ["nombre", "nombre_cliente", "cliente", "name"], "Cliente"),
    Number(firstValue(record, ["cantidad_compras", "compras", "pedidos", "frecuencia"], 0)),
  ];
}

function normalizeInactiveClient(record) {
  const name = firstValue(record, ["nombre", "nombre_cliente", "cliente", "name"], "Cliente sin nombre");

  return [
    String(firstValue(record, ["id_cliente", "id", "nit", "dpi"], "N/D")),
    name,
    String(firstValue(record, ["genero", "sexo", "segmento"], "N/D")),
    "Inactivo",
  ];
}

export function getClientes(params) {
  return apiRequest("/api/clientes", { params });
}

export function getClienteById(idCliente) {
  return apiRequest(`/api/clientes/${idCliente}`);
}

export function getTopClientes(params) {
  return apiRequest("/api/clientes/top10", { params });
}

export function getClientesSinCompras(params) {
  return apiRequest("/api/clientes/sin-compras", { params });
}

export function getClienteMayorConsumo() {
  return apiRequest("/api/clientes/mayor-consumo");
}

export async function getClientesData(params = {}) {
  const [clientesPayload, topPayload, inactivePayload, mayorConsumo] = await Promise.all([
    getClientes({ limit: 50, offset: 0, ...params }),
    getTopClientes({ limit: 10 }),
    getClientesSinCompras({ limit: 50 }),
    getClienteMayorConsumo(),
  ]);

  const clients = getListPayload(clientesPayload).map(normalizeClient);
  const topRecords = getListPayload(topPayload);
  const inactiveClients = getListPayload(inactivePayload).map(normalizeInactiveClient);
  const topByAmount = topRecords.map(normalizeTopByAmount);
  const topByPurchases = topRecords.map(normalizeTopByPurchases);
  const topClient = Array.isArray(mayorConsumo) ? mayorConsumo[0] : mayorConsumo;
  const topClientName = firstValue(topClient, ["nombre", "nombre_cliente", "cliente", "name"], "N/D");
  const topClientAmount = firstValue(topClient, ["monto_total", "total_compras", "total", "total_comprado"], 0);

  return {
    ...clientesData,
    clients: clients.length ? clients : clientesData.clients,
    inactiveClients: inactiveClients.length ? inactiveClients : clientesData.inactiveClients,
    topByAmount: topByAmount.length ? topByAmount : clientesData.topByAmount,
    topByPurchases: topByPurchases.length ? topByPurchases : clientesData.topByPurchases,
    kpis: clientesData.kpis.map((kpi) => {
      if (kpi.label === "Total de Clientes") {
        return { ...kpi, value: String(clients.length || clientesData.clients.length) };
      }

      if (kpi.label === "Clientes con Compras") {
        const active = clients.filter((client) => client[8] === "Activo").length;
        return { ...kpi, value: String(active || 0) };
      }

      if (kpi.label === "Clientes sin Compras") {
        return { ...kpi, value: String(inactiveClients.length || 0) };
      }

      if (kpi.label === "Mayor Consumo") {
        return {
          ...kpi,
          value: formatCurrency(topClientAmount),
          trend: topClientName,
        };
      }

      return kpi;
    }),
  };
}

export function getClientesMockData() {
  return clientesData;
}
