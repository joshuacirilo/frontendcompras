function EmptyBlock({ title = "Sin datos", message = "La API no devolvio registros para esta seccion." }) {
  return (
    <section className="state-panel" style={{ minHeight: "12rem" }}>
      <div className="state-icon muted">
        <span className="material-symbols-outlined" aria-hidden="true">
          inbox
        </span>
      </div>
      <h3>{title}</h3>
      <p>{message}</p>
    </section>
  );
}

export default EmptyBlock;
