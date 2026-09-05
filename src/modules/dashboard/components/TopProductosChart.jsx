import ChartCanvas from "./ChartCanvas";

function TopProductosChart({ data }) {
  const config = {
    type: "bar",
    data: {
      labels: data.map(([label]) => label),
      datasets: [
        {
          label: "Unidades vendidas",
          data: data.map(([, value]) => Number(value.split(" ")[0].replace(",", ""))),
          backgroundColor: "#003d28",
          borderRadius: 8,
        },
      ],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
    },
  };

  return (
    <section className="dashboard-panel ranking-card">
      <div className="panel-title-row">
        <div>
          <h3>Top 10 Productos por Ventas</h3>
          <p>Mayor rotacion en volumen de unidades e ingreso</p>
        </div>
        <button className="icon-button" type="button" aria-label="Opciones de top productos">
          <span className="material-symbols-outlined" aria-hidden="true">
            more_vert
          </span>
        </button>
      </div>

      <ChartCanvas
        ariaLabel="Grafica de barras horizontales de top diez productos"
        config={config}
        fallback={<RankingFallback data={data} />}
      />

      <div className="panel-footer-link">
        <span>SKUs con 68% de rotacion global</span>
        <a href="#">Ver inventario</a>
      </div>
    </section>
  );
}

function RankingFallback({ data }) {
  return (
    <div className="ranking-list">
      {data.map(([label, value, percentage], index) => (
        <div className="ranking-item" key={label}>
          <div>
            <span>
              {index + 1}. {label}
            </span>
            <strong>{value}</strong>
          </div>
          <div className="progress-track">
            <span className="progress-bar tertiary" style={{ width: `${percentage}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopProductosChart;
