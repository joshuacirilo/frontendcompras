function VentasPorAnio({ data }) {
  return (
    <section className="compras-panel compras-yearly-card">
      <div className="compras-panel-title-row">
        <h3>Ventas por Ano</h3>
        <span>/api/compras/por-anio</span>
      </div>
      <p>Desempeno consolidado anual segun la API.</p>
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
    </section>
  );
}

export default VentasPorAnio;
