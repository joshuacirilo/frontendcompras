function TopClientesPorTipoTarjeta({ clients }) {
  return (
    <section className="tarjetas-panel tarjetas-top-clients">
      <div className="tarjetas-panel-heading">
        <div>
          <h2>
            <span className="material-symbols-outlined" aria-hidden="true">groups</span>
            Top compradores por modalidad
          </h2>
          <p>Clientes con mayor facturacion segun tipo de tarjeta.</p>
        </div>
      </div>
      <div className="tarjetas-client-list">
        {clients.map((client) => (
          <article key={client.client}>
            <div className="tarjetas-client-avatar">{client.initials}</div>
            <div className="tarjetas-client-main">
              <strong>{client.client}</strong>
              <span>
                <b className={client.type.includes("Debito") ? "debit" : ""}>{client.type}</b>
                {client.card}
              </span>
            </div>
            <div className="tarjetas-client-total">
              <strong>{client.amount}</strong>
              <span>{client.orders}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TopClientesPorTipoTarjeta;
