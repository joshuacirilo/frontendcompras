import { useMemo } from "react";
import ChartCanvas from "../../dashboard/components/ChartCanvas";

function TopClientesPorCompras({ data }) {
  const max = Math.max(...data.map(([, value]) => value));
  const config = useMemo(
    () => ({
      type: "bar",
      data: {
        labels: data.map(([name]) => name),
        datasets: [
          {
            label: "Cantidad de compras",
            data: data.map(([, value]) => value),
            backgroundColor: "#68dba9",
            borderRadius: 8,
            barThickness: 18,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: "#e5eeff" }, ticks: { color: "#757684" } },
          y: { grid: { display: false }, ticks: { color: "#444653" } },
        },
      },
    }),
    [data],
  );

  return (
    <section className="clientes-panel clientes-chart-panel">
      <div className="clientes-panel-heading">
        <div>
          <h2>
            <span className="material-symbols-outlined" aria-hidden="true">receipt_long</span>
            Top 10 clientes por cantidad de compras
          </h2>
          <p>Comparativo operativo por frecuencia transaccional.</p>
        </div>
        <span>{max} max</span>
      </div>
      <ChartCanvas ariaLabel="Top 10 clientes por cantidad de compras" config={config} />
    </section>
  );
}

export default TopClientesPorCompras;
