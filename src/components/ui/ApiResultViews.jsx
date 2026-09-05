import { getListPayload } from "../../services/apiService";

function cleanLabel(key) {
  return String(key)
    .replace(/^id_?/i, "ID ")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatValue(value) {
  if (value === null || value === undefined || value === "") return "N/D";
  if (typeof value === "number") return value.toLocaleString("es-GT");
  if (typeof value === "boolean") return value ? "Si" : "No";
  if (typeof value === "object") return summarizePayload(value);

  return String(value);
}

function firstValue(record, keys) {
  for (const key of keys) {
    if (record?.[key] !== undefined && record?.[key] !== null && record[key] !== "") {
      return record[key];
    }
  }

  return null;
}

export function summarizePayload(payload) {
  const list = getListPayload(payload);
  const source = list[0] || (Array.isArray(payload) ? payload[0] : payload);

  if (!source || typeof source !== "object") {
    return list.length ? `${list.length.toLocaleString("es-GT")} registros` : formatValue(payload);
  }

  const label = firstValue(source, [
    "nombre",
    "nombre_cliente",
    "nombre_producto",
    "cliente",
    "producto",
    "categoria",
    "marca",
    "tipo",
    "anio",
    "mes",
  ]);
  const value = firstValue(source, [
    "total_facturado",
    "monto_total",
    "total_compra",
    "total_compras",
    "promedio_compra",
    "ticket_promedio",
    "cantidad",
    "porcentaje",
    "count",
    "total",
  ]);

  if (label !== null && value !== null) return `${formatValue(label)}: ${formatValue(value)}`;
  if (label !== null) return formatValue(label);
  if (value !== null) return formatValue(value);

  return Object.entries(source)
    .slice(0, 2)
    .map(([key, itemValue]) => `${cleanLabel(key)}: ${formatValue(itemValue)}`)
    .join(" · ");
}

function getCount(payload) {
  const list = getListPayload(payload);
  const total = firstValue(payload, ["total", "count", "total_compras"]);

  if (total !== null) return Number(total).toLocaleString("es-GT");
  if (list.length) return list.length.toLocaleString("es-GT");
  if (payload) return "1";

  return "0";
}

function getRows(payload) {
  const list = getListPayload(payload);
  if (list.length) return list;
  if (payload && typeof payload === "object") return [payload];

  return [];
}

function ApiStateBadge({ status }) {
  const label = status === "error" ? "Error" : status === "loading" ? "Cargando" : "Disponible";

  return <span className={`api-state-badge ${status}`}>{label}</span>;
}

export function ApiSummaryCard({ item }) {
  const result = item.status === "error" ? "No se pudo cargar el resultado." : summarizePayload(item.payload);

  return (
    <article className={`api-summary-card ${item.status}`}>
      <div className="api-summary-card-top">
        <span className="material-symbols-outlined" aria-hidden="true">
          {item.icon}
        </span>
        <ApiStateBadge status={item.status} />
      </div>
      <div>
        <h2>{item.title}</h2>
        <strong>{item.status === "loading" ? "Consultando..." : result}</strong>
      </div>
      <span>{item.status === "loading" ? "Esperando respuesta" : `${getCount(item.payload)} resultado(s)`}</span>
    </article>
  );
}

export function ApiResultList({ item }) {
  const rows = item.status === "loading" ? [] : getRows(item.payload);

  return (
    <section className={`api-list-panel ${item.status}`}>
      <div className="api-list-heading">
        <div>
          <h2>{item.title}</h2>
          <span>{item.status === "loading" ? "Consultando..." : `${getCount(item.payload)} resultado(s)`}</span>
        </div>
        <ApiStateBadge status={item.status} />
      </div>

      {item.status === "error" ? (
        <p className="api-list-message">No se pudo cargar la informacion.</p>
      ) : rows.length ? (
        <div className="api-list">
          {rows.slice(0, 10).map((row, index) => (
            <article className="api-list-row" key={`${item.id}-${index}`}>
              <strong>{summarizePayload(row)}</strong>
              {typeof row === "object" ? (
                <dl>
                  {Object.entries(row)
                    .slice(0, 4)
                    .map(([key, value]) => (
                      <div key={key}>
                        <dt>{cleanLabel(key)}</dt>
                        <dd>{formatValue(value)}</dd>
                      </div>
                    ))}
                </dl>
              ) : null}
            </article>
          ))}
        </div>
      ) : (
        <p className="api-list-message">Sin datos disponibles.</p>
      )}
    </section>
  );
}
