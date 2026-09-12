import ChartCanvas from "./ChartCanvas";

function TopClientesChart({ data }) {
  const config = {
    type: "bar",
    data: {
      labels: data.map(([label]) => label),
      datasets: [
        {
          label: "Monto comprado",
          data: data.map(([, value]) => Number(String(value).replace(/[^\d.]/g, ""))),
          backgroundColor: "#1e40af",
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
          <h3>Top 10 Clientes por Consumo</h3>
          <p>Distribucion de compras segun /api/clientes/top10</p>
        </div>
      </div>

      <ChartCanvas
        ariaLabel="Grafica de barras horizontales de top diez clientes"
        config={config}
        fallback={<RankingFallback data={data} />}
      />

      <div className="panel-footer-link">
        <span>Mostrando {data.length} clientes de la API</span>
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
            <span className="progress-bar" style={{ width: `${percentage}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopClientesChart;
