import ChartCanvas from "../../dashboard/components/ChartCanvas";

function VentasPorMes({ data }) {
  const config = {
    type: "line",
    data: {
      labels: data.labels,
      datasets: [
        {
          label: "Ventas por mes",
          data: data.values,
          borderColor: "#1e40af",
          backgroundColor: "rgba(30, 64, 175, 0.18)",
          fill: true,
          tension: 0.42,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: "#00563a",
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => `Q ${Number(context.parsed.y).toLocaleString("es-GT")}.00`,
          },
        },
      },
      scales: {
        x: { grid: { display: false } },
        y: {
          ticks: { callback: (value) => `Q ${Number(value) / 1000}k` },
        },
      },
    },
  };

  return (
    <section className="compras-panel compras-monthly-chart">
      <div className="compras-panel-heading">
        <div>
          <h2>
            <i aria-hidden="true" />
            Evolucion de Ventas por Mes (Ultimos 12 Meses)
          </h2>
          <p>Curva transaccional con proyeccion de cierre mensual y puntos de corte fiscal.</p>
        </div>
        <div className="compras-range-tabs" aria-label="Rango de grafica mensual">
          <button type="button">7D</button>
          <button type="button">30D</button>
          <button className="is-active" type="button">12M</button>
          <button type="button">YTD</button>
        </div>
      </div>
      <ChartCanvas
        ariaLabel="Grafica de linea de ventas por mes"
        config={config}
        fallback={
          <div className="line-chart-fallback" aria-hidden="true">
            {data.values.map((value, index) => (
              <span key={data.labels[index]} style={{ height: `${Math.max(18, (value / 380000) * 100)}%` }} />
            ))}
          </div>
        }
      />
    </section>
  );
}

export default VentasPorMes;
