import ChartCanvas from "./ChartCanvas";

function VentasPorMesChart({ data }) {
  const config = {
    type: "line",
    data: {
      labels: data.labels,
      datasets: [
        {
          label: "Ventas mensuales",
          data: data.values,
          borderColor: "#1e40af",
          backgroundColor: "rgba(30, 64, 175, 0.18)",
          fill: true,
          tension: 0.42,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: "#1e40af",
          pointRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        y: {
          ticks: {
            callback: (value) => `Q ${Number(value) / 1000}k`,
          },
        },
      },
    },
  };

  return (
    <section className="dashboard-panel sales-chart-panel">
      <div className="panel-title-row">
        <div>
          <h3>Evolucion de Ventas Mensuales</h3>
          <p>Serie desde /api/compras/por-mes (Chart.js)</p>
        </div>
      </div>

      <ChartCanvas ariaLabel="Grafica de linea de ventas por mes" config={config} />
    </section>
  );
}

export default VentasPorMesChart;
