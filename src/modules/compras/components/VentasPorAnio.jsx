function VentasPorAnio({ data }) {
  return (
    <section className="compras-panel compras-yearly-card">
      <div className="compras-panel-title-row">
        <h3>Ventas por Ano / Comparativa Historica</h3>
        <span>2022 - 2024 YTD</span>
      </div>
      <p>Desempeno consolidado anual y tasa compuesta de crecimiento interanual (CAGR).</p>
      <div className="yearly-bars">
        {data.map((item) => (
          <div className="yearly-bar-item" key={item.year}>
            <div>
              <span>
                {item.year}
                {item.trend ? <em>{item.trend}</em> : null}
              </span>
              <strong>{item.amount}</strong>
            </div>
            <div className="yearly-track">
              <b className={item.tone} style={{ width: `${item.percent}%` }}>
                {item.percent}%
              </b>
            </div>
          </div>
        ))}
      </div>
      <div className="growth-summary">
        <span className="material-symbols-outlined" aria-hidden="true">
          insights
        </span>
        <div>
          <strong>Proyeccion Q2-Q4 2024</strong>
          <small>Ritmo proyectado: Q 1.8M al cierre fiscal</small>
        </div>
        <b>142.6% vs Plan</b>
      </div>
    </section>
  );
}

export default VentasPorAnio;
