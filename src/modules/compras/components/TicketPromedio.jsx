function TicketPromedio({ summary = "Q 78.14 por compra, mediana Q 64.00 y canasta regular de 3.8 SKUs." }) {
  return (
    <section className="compras-ticket-note" aria-label="Resumen del ticket promedio">
      <span className="material-symbols-outlined" aria-hidden="true">
        receipt
      </span>
      <div>
        <strong>Ticket promedio fiscalizado</strong>
        <p>{summary}</p>
      </div>
    </section>
  );
}

export default TicketPromedio;
