function ClientesSinCompras({ clients }) {
  return (
    <section className="clientes-panel clientes-inactive-panel">
      <div className="clientes-panel-heading">
        <div>
          <h2>
            <span className="material-symbols-outlined" aria-hidden="true">person_off</span>
            Clientes sin compras
          </h2>
          <p>Casos prioritarios con registro activo y consumo en cero.</p>
        </div>
        <a href="#clientes-directorio">Ver todos los inactivos (960)</a>
      </div>
      <div className="clientes-table-scroll">
        <table className="clientes-table compact">
          <thead>
            <tr>
              <th>Identificador</th>
              <th>Cliente</th>
              <th>Genero</th>
              <th>Estado</th>
              <th className="is-right">Accion</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(([id, name, gender, status]) => (
              <tr key={id}>
                <td className="clientes-id">{id}</td>
                <td>{name}</td>
                <td>{gender}</td>
                <td><span className="clientes-status inactive">{status}</span></td>
                <td className="is-right">
                  <button className="clientes-icon-button" type="button" aria-label={`Contactar a ${name}`}>
                    <span className="material-symbols-outlined" aria-hidden="true">outgoing_mail</span>
                  </button>
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
