function StatePanel({ type, onReset }) {
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
        <h3>No se encontraron registros en el rango</h3>
        <p>
          Los parametros aplicados no devolvieron transacciones de compra activas para los
          productos o clientes seleccionados.
        </p>
        <button className="ghost-button" onClick={onReset} type="button">
          <span className="material-symbols-outlined" aria-hidden="true">
            refresh
          </span>
          Restablecer parametros predeterminados
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
        No fue posible consolidar las particiones transaccionales del servidor principal de base de
        datos. Codigo de referencia: <strong>ERR_DBA_TIMEOUT_504</strong>.
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
