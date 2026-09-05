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
          <p>Comportamiento financiero anual acumulado (Cifras expresadas en Quetzales - GTQ)</p>
        </div>
        <div className="segmented-actions">
          <button className="is-active" type="button">
            2024
          </button>
          <button type="button">2023</button>
          <button className="icon-button" type="button" aria-label="Descargar datos en CSV">
            <span className="material-symbols-outlined" aria-hidden="true">
              download
            </span>
          </button>
        </div>
      </div>

      <ChartCanvas
        ariaLabel="Grafica de linea de ventas por mes"
        config={config}
        fallback={
          <div className="line-chart-fallback" aria-hidden="true">
            {data.values.map((value, index) => (
              <span
                key={data.labels[index]}
                style={{ height: `${Math.max(18, (value / 400000) * 100)}%` }}
                title={`${data.labels[index]}: ${value}`}
              />
            ))}
          </div>
        }
      />
    </section>
  );
}

export default VentasPorMesChart;
