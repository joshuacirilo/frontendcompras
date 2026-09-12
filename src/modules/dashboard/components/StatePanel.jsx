function StatePanel({ message, type, onReset }) {
  if (type === "loading") {
    return (
      <div className="dashboard-loading" aria-label="Cargando informacion del dashboard">
        <div className="kpi-grid">
          <div />
          <div />
          <div />
          <div />
        </div>
        <div className="module-grid">
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
        <div className="loading-chart" />
      </div>
    );
  }

  if (type === "empty") {
    return (
      <section className="state-panel">
        <div className="state-icon muted">
          <span className="material-symbols-outlined" aria-hidden="true">
            folder_off
          </span>
        </div>
        <h3>No se encontraron registros</h3>
        <p>
          {message ||
            "La API no devolvio informacion disponible para construir el resumen del dashboard."}
        </p>
        <button className="ghost-button" onClick={onReset} type="button">
          <span className="material-symbols-outlined" aria-hidden="true">
            refresh
          </span>
          Reintentar consulta
        </button>
      </section>
    );
  }

  return (
    <section className="state-panel">
      <div className="state-icon error">
        <span className="material-symbols-outlined" aria-hidden="true">
          sync_problem
        </span>
      </div>
      <h3>Error de Sincronizacion con el Servidor</h3>
      <p>
        {message || "No fue posible consultar la API del dashboard. Reintenta la consulta."}
      </p>
      <button className="primary-button" onClick={onReset} type="button">
        <span className="material-symbols-outlined" aria-hidden="true">
          replay
        </span>
        Reintentar Consulta
      </button>
    </section>
  );
}

export default StatePanel;
