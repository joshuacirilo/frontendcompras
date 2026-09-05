const statusClassByName = {
  Completada: "completed",
  Procesando: "processing",
  Cancelada: "cancelled",
};

function ComprasTable({ purchases, total }) {
  return (
    <section className="compras-table-panel">
      <div className="compras-table-header">
        <div>
          <h3>Registro Maestro de Transacciones</h3>
          <span>{total} Compras</span>
        </div>
        <div className="compras-table-actions">
          <button type="button">
            <span className="material-symbols-outlined" aria-hidden="true">
              table_view
            </span>
            CSV
          </button>
          <button type="button">
            <span className="material-symbols-outlined error" aria-hidden="true">
              picture_as_pdf
            </span>
            PDF
          </button>
        </div>
      </div>

      <div className="compras-table-scroll">
        <table className="compras-table">
          <thead>
            <tr>
              <th>ID Compra</th>
              <th>Fecha y Hora</th>
              <th>Cliente</th>
              <th className="is-right">Monto Total</th>
              <th>Metodo / Tarjeta</th>
              <th>Estado</th>
              <th className="is-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {purchases.length ? (
              purchases.map(([id, date, client, detail, amount, card, icon, status]) => (
                <tr key={id}>
                  <td className="purchase-id">{id}</td>
                  <td className="purchase-date">{date}</td>
                  <td>
                    <a href="#">
                      {client}
                      <span className="material-symbols-outlined" aria-hidden="true">
                        open_in_new
                      </span>
                    </a>
                    <small>{detail}</small>
                  </td>
                  <td className="purchase-amount">{amount}</td>
                  <td>
                    <div className="purchase-card">
                      <span className="material-symbols-outlined" aria-hidden="true">
                        {icon}
                      </span>
                      <span>{card}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-pill ${statusClassByName[status]}`}>
                      <i aria-hidden="true" />
                      {status}
                    </span>
                  </td>
                  <td className="is-center">
                    <button className="table-icon-button" type="button" aria-label={`Ver detalle de ${id}`}>
                      <span className="material-symbols-outlined" aria-hidden="true">
                        receipt_long
                      </span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="empty-table-cell" colSpan="7">
                  No hay compras disponibles para mostrar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="compras-pagination">
        <div>
          <span>Mostrando registros</span>
          <strong>1 - 10</strong>
          <span>de</span>
          <strong>{total}</strong>
          <span>transacciones totales</span>
        </div>
        <nav aria-label="Paginacion de compras">
          <button disabled type="button" aria-label="Primera pagina">
            <span className="material-symbols-outlined" aria-hidden="true">keyboard_double_arrow_left</span>
          </button>
          <button disabled type="button" aria-label="Pagina anterior">
            <span className="material-symbols-outlined" aria-hidden="true">chevron_left</span>
          </button>
          <strong>1</strong>
          <button type="button">2</button>
          <button type="button">3</button>
          <span>...</span>
          <button type="button">1,254</button>
          <button type="button" aria-label="Pagina siguiente">
            <span className="material-symbols-outlined" aria-hidden="true">chevron_right</span>
          </button>
        </nav>
      </div>
    </section>
  );
}

export default ComprasTable;
