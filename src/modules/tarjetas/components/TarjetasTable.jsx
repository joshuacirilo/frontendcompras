function TarjetasTable({ rows, simpleRows }) {
  return (
    <section className="tarjetas-table-panel">
      <div className="tarjetas-table-header">
        <div>
          <h2>Transacciones y terminales por medio de pago</h2>
          <p>Auditoria detallada por combinacion de marca, tipo de plastico y desempeno operativo POS.</p>
        </div>
        <div className="tarjetas-table-actions">
          <button className="primary" type="button">
            <span className="material-symbols-outlined" aria-hidden="true">download</span>
            CSV Data
          </button>
        </div>
      </div>

      <div className="tarjetas-table-scroll">
        <table className="tarjetas-table">
          <thead>
            <tr>
              <th>Marca emisora</th>
              <th>Modalidad</th>
              <th>Transacciones</th>
              <th>Volumen total (Q)</th>
              <th>Ticket promedio</th>
              <th>Aprobacion</th>
              <th>Rechazos</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([code, brand, terminal, type, transactions, volume, avg, approval, rejections]) => (
              <tr key={`${brand}-${type}`}>
                <td>
                  <div className="tarjetas-brand-cell">
                    <span className={`brand-code ${code.toLowerCase()}`}>{code}</span>
                    <div>
                      <strong>{brand}</strong>
                      <small>{terminal}</small>
                    </div>
                  </div>
                </td>
                <td><span className={type === "Debito" ? "type-pill debit" : "type-pill"}>{type}</span></td>
                <td>{transactions}</td>
                <td className={type === "Debito" ? "amount debit" : "amount"}>{volume}</td>
                <td>{avg}</td>
                <td><span className="approval-dot"><i />{approval}</span></td>
                <td className="rejections">{rejections}</td>
                <td>
                  <button className="tarjetas-row-action" type="button" aria-label={`Ver detalle de ${brand}`}>
                    <span className="material-symbols-outlined" aria-hidden="true">more_horiz</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="tarjetas-simple-table">
        <h3>Tarjetas utilizadas</h3>
        <div className="tarjetas-table-scroll">
          <table className="tarjetas-table compact">
            <thead>
              <tr>
                <th>Tarjeta</th>
                <th>Marca</th>
                <th>Tipo</th>
                <th>Cliente</th>
                <th>Usos</th>
              </tr>
            </thead>
            <tbody>
              {simpleRows.map(([card, brand, type, client, uses]) => (
                <tr key={`${card}-${client}`}>
                  <td>{card}</td>
                  <td>{brand}</td>
                  <td>{type}</td>
                  <td>{client}</td>
                  <td>{uses}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="tarjetas-table-footer">
        <span>Mostrando <strong>6 combinaciones</strong> de terminales adquirentes.</span>
        <nav aria-label="Paginacion de tarjetas">
          <button type="button" disabled>Anterior</button>
          <strong>1</strong>
          <button type="button">2</button>
          <button type="button">Siguiente</button>
        </nav>
      </div>
    </section>
  );
}

export default TarjetasTable;
