import { useMemo } from "react";
import ChartCanvas from "../../dashboard/components/ChartCanvas";

function ProductosMayoresIngresos({ data }) {
  const config = useMemo(
    () => ({
      type: "bar",
      data: {
        labels: data.map(([name]) => name),
        datasets: [
          {
            label: "Ingreso Total",
            data: data.map(([, revenue]) => revenue),
            backgroundColor: "#00288e",
            borderRadius: 6,
            barThickness: 28,
          },
          {
            label: "Margen",
            data: data.map(([, , margin]) => margin),
            backgroundColor: "#00563a",
            borderRadius: 6,
            barThickness: 20,
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
              label: (context) => `${context.dataset.label}: Q ${context.raw.toLocaleString("en-US")}.00`,
            },
          },
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: "#444653" } },
          y: {
            grid: { color: "#e5eeff" },
            ticks: { color: "#757684", callback: (value) => `Q ${Number(value) / 1000}k` },
          },
        },
      },
    }),
    [data],
  );

  return (
    <section className="productos-panel productos-revenue-panel">
      <div className="productos-panel-heading">
        <div>
          <h2>Mayores Ingresos y Margen Bruto</h2>
          <p>Facturacion bruta (Q) vs. margen operativo proyectado</p>
        </div>
        <div className="productos-chart-legend">
          <span><i className="primary" /> Ingreso Total</span>
          <span><i className="tertiary" /> Margen</span>
        </div>
      </div>
      <ChartCanvas ariaLabel="Grafica comparativa de productos con mayores ingresos y margen bruto" config={config} />
    </section>
  );
}

export default ProductosMayoresIngresos;
