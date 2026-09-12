const currencyFormatter = new Intl.NumberFormat("es-GT", {
  currency: "GTQ",
  style: "currency",
});

const CATEGORY_COLORS = ["#00288e", "#5bcf9e", "#dae2fd", "#bec6e0", "#1e40af", "#68dba9", "#00563a"];

export function firstValue(record, keys, fallback = null) {
  for (const key of keys) {
    if (record?.[key] !== undefined && record?.[key] !== null && record[key] !== "") {
      return record[key];
    }
  }

  return fallback;
}

export function formatCurrency(value) {
  const number = Number(value || 0);
  return currencyFormatter.format(number).replace("GTQ", "Q").trim();
}

export function formatCount(value) {
  return Number(value || 0).toLocaleString("es-GT");
}

export function toNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

export function percentOfMax(value, max, floor = 0) {
  if (!max) return floor;
  return Math.max(floor, Math.round((value / max) * 100));
}

export function colorAt(index) {
  return CATEGORY_COLORS[index % CATEGORY_COLORS.length];
}

export function initialsFromName(name) {
  return String(name || "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function monthLabel(record, index = 0) {
  const month = firstValue(record, ["mes", "month", "periodo", "fecha"], "");
  const year = firstValue(record, ["anio", "year"], "");

  if (month && year) return `${month} ${year}`;
  if (month) return String(month);
  return `Mes ${index + 1}`;
}
