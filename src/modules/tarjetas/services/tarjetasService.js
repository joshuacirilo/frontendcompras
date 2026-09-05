const tarjetasData = {
  filters: {
    fechas: ["Mes actual (Oct 2024)", "Trimestre movil (Q3-Q4)", "Anio completo 2024", "Personalizado"],
    clientes: ["Todos los clientes", "Distribuidora Central S.A.", "Supertiendas Aurora", "Farmacias del Golfo S.A.", "Operadora de Hoteles Maya"],
    marcas: ["Todas las marcas", "Visa Inc.", "Mastercard Worldwide", "American Express", "Otras locales"],
    tipos: ["Todas las modalidades", "Credito financiado", "Debito inmediato"],
  },
  kpis: [
    {
      label: "Tarjetas registradas",
      value: "2,890",
      icon: "credit_card",
      trend: "+8.4%",
      detail: "plasticos unicos activos",
    },
    {
      label: "Marca mas utilizada",
      value: "Visa",
      icon: "workspace_premium",
      trend: "58.0%",
      detail: "dominancia en volumen transaccional POS",
      highlighted: true,
    },
    {
      label: "Credito",
      value: "64%",
      icon: "payments",
      trend: "Q 696,119",
      detail: "volumen financiado",
    },
    {
      label: "Debito",
      value: "36%",
      icon: "account_balance_wallet",
      trend: "Q 284,331",
      detail: "cargo inmediato",
    },
  ],
  gateway: {
    provider: "Gateway BAC/Visanet",
    uptime: "99.8% Online",
    cut: "Ultimo corte POS: Hoy 18:42",
  },
  mostUsedBrand: {
    brand: "Visa",
    share: 58,
    transactions: "6,565",
    volume: "Q 568,662.00",
    approval: "99.4%",
    detail: "Marca lider en credito y debito con mayor volumen POS.",
  },
  creditDebit: [
    ["Credito", 64, "#00288e"],
    ["Debito", 36, "#68dba9"],
  ],
  byBrand: [
    ["Visa", "6,565", 58, "#00288e"],
    ["Mastercard", "3,812", 32, "#565e74"],
    ["Amex", "241", 7, "#00563a"],
    ["Otras", "652", 3, "#757684"],
  ],
  billingByBrand: [
    ["Visa", "Q 568,662", 58],
    ["Mastercard", "Q 313,744", 32],
    ["American Express", "Q 68,631", 7],
    ["Otras marcas", "Q 29,413", 3],
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
  tableRows: [
    ["VISA", "Visa Clasica / Gold / Plat", "Terminal POS 8812 - BAC", "Credito", "3,650", "Q 410,625.00", "Q 112.50", "99.4%", "0.6% (22)"],
    ["MC", "Mastercard Standard / Black", "Terminal POS 8812 - Visanet", "Credito", "1,927", "Q 216,863.00", "Q 112.54", "99.1%", "0.9% (17)"],
    ["VISA", "Visa Electron Debito GT", "Multi-banco Nacional", "Debito", "2,915", "Q 158,037.00", "Q 54.22", "99.5%", "0.5% (14)"],
    ["MC", "Mastercard Debito Directo", "Terminal POS 8814 - BI", "Debito", "1,885", "Q 96,881.00", "Q 51.40", "98.9%", "1.1% (21)"],
    ["AMEX", "American Express Corporativa", "Terminal BAC Credomatic Direct", "Credito", "241", "Q 68,631.00", "Q 284.77", "99.2%", "0.8% (2)"],
    ["OTRAS", "Club Promerica / Vales Locales", "Terminal Alterna Offline", "Debito", "652", "Q 29,413.00", "Q 45.11", "97.8%", "2.2% (14)"],
  ],
  tableSimple: [
    ["Visa **** 4381", "Visa", "Credito", "Distribuidora Central S.A.", "82"],
    ["Mastercard **** 1284", "Mastercard", "Credito", "Supertiendas Aurora", "63"],
    ["Visa **** 8831", "Visa", "Debito", "Farmacias del Golfo S.A.", "35"],
    ["Amex **** 0094", "American Express", "Credito", "Operadora de Hoteles Maya", "18"],
  ],
};

export function getTarjetasData() {
  return tarjetasData;
}
