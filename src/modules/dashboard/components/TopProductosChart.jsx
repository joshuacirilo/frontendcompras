import ChartCanvas from "./ChartCanvas";

function TopProductosChart({ data }) {
  const config = {
    type: "bar",
    data: {
      labels: data.map(([label]) => label),
      datasets: [
        {
          label: "Unidades vendidas",
          data: data.map(([, value]) => Number(String(value).split(" ")[0].replace(/,/g, "")) || 0),
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
          <p>Mayor rotacion segun /api/productos/top10</p>
        </div>
      </div>

      <ChartCanvas
        ariaLabel="Grafica de barras horizontales de top diez productos"
        config={config}
        fallback={<RankingFallback data={data} />}
      />

      <div className="panel-footer-link">
        <span>Mostrando {data.length} productos de la API</span>
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
