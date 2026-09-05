import { useMemo } from "react";
import ChartCanvas from "../../dashboard/components/ChartCanvas";

function TopClientesPorMonto({ data }) {
  const config = useMemo(
    () => ({
      type: "bar",
      data: {
        labels: data.map(([name]) => name),
        datasets: [
          {
            label: "Monto comprado",
            data: data.map(([, value]) => value),
            backgroundColor: "#00288e",
            borderRadius: 8,
            barThickness: 18,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => `Q ${context.raw.toLocaleString("en-US")}`,
            },
          },
        },
        scales: {
          x: { grid: { color: "#e5eeff" }, ticks: { color: "#757684" } },
          y: { grid: { display: false }, ticks: { color: "#444653" } },
        },
      },
    }),
    [data],
  );

  return (
    <section className="clientes-panel clientes-chart-panel clientes-wide-chart">
      <div className="clientes-panel-heading">
        <div>
          <h2>
            <span className="material-symbols-outlined" aria-hidden="true">bar_chart</span>
            Top 10 clientes por monto comprado
          </h2>
          <p>Ranking financiero por total acumulado de consumo.</p>
        </div>
        <span>Q</span>
      </div>
      <ChartCanvas ariaLabel="Top 10 clientes por monto comprado" config={config} />
    </section>
  );
}

export default TopClientesPorMonto;
