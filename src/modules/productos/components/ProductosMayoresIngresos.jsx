import { useMemo } from "react";
import ChartCanvas from "../../dashboard/components/ChartCanvas";

function ProductosMayoresIngresos({ data }) {
  const hasMargin = data.some(([, , margin]) => margin !== null && margin !== undefined);

  const config = useMemo(() => {
    const datasets = [
      {
        label: "Ingreso Total",
        data: data.map(([, revenue]) => revenue),
        backgroundColor: "#00288e",
        borderRadius: 6,
        barThickness: 28,
      },
    ];

    if (hasMargin) {
      datasets.push({
        label: "Margen",
        data: data.map(([, , margin]) => margin ?? 0),
        backgroundColor: "#00563a",
        borderRadius: 6,
        barThickness: 20,
      });
    }

    return {
      type: "bar",
      data: {
        labels: data.map(([name]) => name),
        datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => `${context.dataset.label}: Q ${context.raw.toLocaleString("en-US")}`,
            },
          },
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: "#444653" } },
          y: {
            grid: { color: "#e5eeff" },
            ticks: {
              color: "#757684",
              callback: (value) => `Q ${Number(value) / 1000}k`,
            },
          },
        },
      },
    };
  }, [data, hasMargin]);

  return (
    <section className="productos-panel productos-revenue-panel">
      <div className="productos-panel-heading">
        <div>
          <h2>Productos con mayores ingresos</h2>
          <p>
            {hasMargin
              ? "Facturacion y margen reportados por la API"
              : "Facturacion segun campos de monto de la API (sin margen inventado)"}
          </p>
        </div>
        <div className="productos-chart-legend">
          <span>
            <i className="primary" /> Ingreso Total
          </span>
          {hasMargin ? (
            <span>
              <i className="tertiary" /> Margen
            </span>
          ) : null}
        </div>
      </div>
      <ChartCanvas ariaLabel="Grafica de productos con mayores ingresos" config={config} />
    </section>
  );
}

export default ProductosMayoresIngresos;
