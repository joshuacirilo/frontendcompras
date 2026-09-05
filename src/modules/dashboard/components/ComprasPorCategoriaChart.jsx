import ChartCanvas from "./ChartCanvas";

function ComprasPorCategoriaChart({ data }) {
  const config = {
    type: "doughnut",
    data: {
      labels: data.map(([label]) => label),
      datasets: [
        {
          data: data.map(([, value]) => value),
          backgroundColor: data.map(([, , color]) => color),
          borderWidth: 0,
        },
      ],
    },
    options: {
      cutout: "72%",
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
    },
  };

  return (
    <section className="dashboard-panel compact-chart-panel">
      <div className="panel-title-row">
        <div>
          <h3>Compras por Categoria</h3>
          <p>Participacion porcentual en ventas</p>
        </div>
        <span className="material-symbols-outlined panel-icon" aria-hidden="true">
          pie_chart
        </span>
      </div>
      <ChartCanvas
        ariaLabel="Grafica de dona de compras por categoria"
        config={config}
        fallback={
          <div className="donut-fallback category-donut" aria-hidden="true">
            <strong>42.5%</strong>
            <span>Lider</span>
          </div>
        }
      />
      <div className="legend-grid">
        {data.map(([label, value, color]) => (
          <span key={label}>
            <i style={{ backgroundColor: color }} />
            {label}: {value}%
          </span>
        ))}
      </div>
    </section>
  );
}

export default ComprasPorCategoriaChart;
