function ClientesTable({ clients }) {
  return (
    <section className="clientes-table-panel" id="clientes-directorio">
      <div className="clientes-table-header">
        <div>
          <h2>Directorio Maestro de Clientes</h2>
          <span>Listado consolidado de cuentas, frecuencia transaccional y saldos acumulados</span>
        </div>
        <div className="clientes-table-actions">
          <button className="clientes-refresh" type="button" aria-label="Refrescar datos">
            <span className="material-symbols-outlined" aria-hidden="true">refresh</span>
          </button>
        </div>
      </div>
      <div className="clientes-table-scroll">
        <table className="clientes-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Identificador / NIT</th>
              <th>Genero</th>
              <th className="is-right">Total Compras (Q)</th>
              <th className="is-right">Frecuencia</th>
              <th>Ultima Compra</th>
              <th>Estado</th>
              <th className="is-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(([initials, name, email, nit, gender, total, frequency, lastPurchase, status]) => (
              <tr key={`${nit}-${name}`}>
                <td>
                  <div className="clientes-person">
                    <span className={status === "Inactivo" ? "clientes-avatar inactive" : "clientes-avatar"}>{initials}</span>
                    <div>
                      <strong>{name}</strong>
                      <small>{email}</small>
                    </div>
                  </div>
                </td>
                <td className="clientes-id">{nit}</td>
                <td>{gender}</td>
                <td className={status === "Inactivo" ? "clientes-money muted is-right" : "clientes-money is-right"}>{total}</td>
                <td className={status === "Inactivo" ? "clientes-id muted is-right" : "clientes-id primary is-right"}>{frequency}</td>
                <td className="muted">{lastPurchase}</td>
                <td><span className={status === "Inactivo" ? "clientes-status inactive" : "clientes-status"}>{status}</span></td>
                <td className="is-right">
                  <button className="clientes-icon-button" type="button" aria-label={`${status === "Inactivo" ? "Contactar" : "Ver"} ${name}`}>
                    <span className="material-symbols-outlined" aria-hidden="true">{status === "Inactivo" ? "send" : "visibility"}</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="clientes-pagination">
        <span>Mostrando <strong>1 - 10</strong> de <strong>4,380</strong> registros</span>
        <nav aria-label="Paginacion de clientes">
          <button type="button" disabled aria-label="Pagina anterior">
            <span className="material-symbols-outlined" aria-hidden="true">chevron_left</span>
          </button>
          <strong>1</strong>
          <button type="button">2</button>
          <button type="button">3</button>
          <span>...</span>
          <button type="button">438</button>
          <button type="button" aria-label="Pagina siguiente">
            <span className="material-symbols-outlined" aria-hidden="true">chevron_right</span>
          </button>
        </nav>
      </div>
    </section>
  );
}

export default ClientesTable;
