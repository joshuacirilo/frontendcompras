function TarjetasPorMarcaChart({ data }) {
  return (
    <section className="dashboard-panel compact-chart-panel">
      <div className="panel-title-row">
        <div>
          <h3>Tarjetas por Marca</h3>
          <p>Emisores procesados en POS/Web</p>
        </div>
        <span className="material-symbols-outlined panel-icon" aria-hidden="true">
          credit_score
        </span>
      </div>
      <div className="brand-bars">
        {data.map(([name, tag, value, percentage]) => (
          <div className="brand-bar" key={name}>
            <div>
              <span>
                <b>{tag}</b>
                {name}
              </span>
              <strong>{value}</strong>
            </div>
            <div className="progress-track large">
              <span className="progress-bar" style={{ width: `${percentage}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="verified-note">
        <span className="material-symbols-outlined" aria-hidden="true">
          verified_user
        </span>
        Tasa de aprobacion POS: 99.1%
      </div>
    </section>
  );
}

export default TarjetasPorMarcaChart;
