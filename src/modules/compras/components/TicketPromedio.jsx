function TicketPromedio({ summary = "Sin ticket promedio reportado por la API." }) {
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
