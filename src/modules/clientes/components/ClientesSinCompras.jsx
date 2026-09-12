function ClientesSinCompras({ clients }) {
  return (
    <section className="clientes-panel clientes-inactive-panel">
      <div className="clientes-panel-heading">
        <div>
          <h2>
            <span className="material-symbols-outlined" aria-hidden="true">
              person_off
            </span>
            Clientes sin compras
          </h2>
          <p>{clients.length} registros desde /api/clientes/sin-compras.</p>
        </div>
      </div>
      <div className="clientes-table-scroll">
        <table className="clientes-table compact">
          <thead>
            <tr>
              <th>Identificador</th>
              <th>Cliente</th>
              <th>Genero</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(([id, name, gender, status]) => (
              <tr key={`${id}-${name}`}>
                <td className="clientes-id">{id}</td>
                <td>{name}</td>
                <td>{gender}</td>
                <td>
                  <span className="clientes-status inactive">{status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ClientesSinCompras;
