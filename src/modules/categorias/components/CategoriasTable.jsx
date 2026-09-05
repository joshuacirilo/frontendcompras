import { useMemo, useState } from "react";

const sorters = {
  "monto-desc": (a, b) => b.amount - a.amount,
  "monto-asc": (a, b) => a.amount - b.amount,
  "compras-desc": (a, b) => b.purchases - a.purchases,
  "ticket-desc": (a, b) => b.ticket - a.ticket,
  "margen-desc": (a, b) => b.margin - a.margin,
};

function formatCurrency(value) {
  return `Q ${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function CategoriasTable({ categories, total }) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("monto-desc");

  const visibleCategories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return [...categories]
      .filter((item) => item.category.toLowerCase().includes(normalizedQuery) || item.code.toLowerCase().includes(normalizedQuery))
      .sort(sorters[sortBy]);
  }, [categories, query, sortBy]);

  return (
    <section className="categorias-table-panel">
      <div className="categorias-table-header">
        <div>
          <h2>Matriz de Desempeno por Categoria</h2>
          <p>Desglose granular de transacciones, ingresos brutos, ticket promedio y contribucion.</p>
        </div>
        <div className="categorias-table-controls">
          <label className="categorias-search">
            <span className="material-symbols-outlined" aria-hidden="true">search</span>
            <input
              aria-label="Buscar categoria"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar categoria..."
              type="search"
              value={query}
            />
          </label>
          <label className="categorias-sort">
            <span className="material-symbols-outlined" aria-hidden="true">swap_vert</span>
            <select aria-label="Ordenar categorias" onChange={(event) => setSortBy(event.target.value)} value={sortBy}>
              <option value="monto-desc">Ordenar: Mayor Monto (Q)</option>
              <option value="monto-asc">Ordenar: Menor Monto (Q)</option>
              <option value="compras-desc">Ordenar: Mayor Compras</option>
              <option value="ticket-desc">Ordenar: Mayor Ticket</option>
              <option value="margen-desc">Ordenar: Mayor Margen (%)</option>
            </select>
          </label>
        </div>
      </div>
      <div className="categorias-table-scroll">
        <table className="categorias-table">
          <thead>
            <tr>
              <th>Linea / Categoria</th>
              <th>Cant. Compras</th>
              <th>Monto Vendido (Q)</th>
              <th>Ticket Promedio (Q)</th>
              <th>Participacion (%)</th>
              <th>Margen Bruto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {visibleCategories.map((item) => (
              <tr className={item.critical ? "is-critical" : ""} key={item.code}>
                <td>
                  <div className="categorias-name-cell">
                    <span className="material-symbols-outlined" aria-hidden="true">{item.icon}</span>
                    <div>
                      <strong>{item.category}</strong>
                      <small>{item.code}{item.critical ? " (Critico)" : ""}</small>
                    </div>
                  </div>
                </td>
                <td>{item.purchases.toLocaleString("en-US")}</td>
                <td className={item.critical ? "danger" : item.tone === "primary" ? "primary" : ""}>{formatCurrency(item.amount)}</td>
                <td>{formatCurrency(item.ticket)}</td>
                <td>
                  <div className="categorias-share-cell">
                    <span><i style={{ width: `${Math.max(item.share, 1)}%` }} /></span>
                    <b>{item.share.toFixed(item.share < 1 ? 1 : 1)}%</b>
                  </div>
                </td>
                <td><mark className={item.critical ? "danger" : item.margin >= 30 ? "success" : ""}>{item.margin.toFixed(1)}%</mark></td>
                <td>
                  <button type="button" aria-label={`Ver detalle de ${item.category}`} title="Ver Detalle">
                    <span className="material-symbols-outlined" aria-hidden="true">{item.critical ? "warning" : "visibility"}</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="categorias-pagination">
        <span>Mostrando <strong>1 - {visibleCategories.length}</strong> de <strong>{total}</strong> lineas analizadas</span>
        <nav aria-label="Paginacion categorias">
          <button disabled type="button"><span className="material-symbols-outlined" aria-hidden="true">chevron_left</span></button>
          <strong>1</strong>
          <button type="button">2</button>
          <button type="button">3</button>
          <button type="button"><span className="material-symbols-outlined" aria-hidden="true">chevron_right</span></button>
        </nav>
      </div>
    </section>
  );
}

export default CategoriasTable;
