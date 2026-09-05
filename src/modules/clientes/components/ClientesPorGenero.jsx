import { useMemo } from "react";
import ChartCanvas from "../../dashboard/components/ChartCanvas";

function ClientesPorGenero({ data }) {
  const config = useMemo(
    () => ({
      type: "doughnut",
      data: {
        labels: data.map(([label]) => label),
        datasets: [
          {
            data: data.map(([, value]) => value),
            backgroundColor: data.map(([, , color]) => color),
            borderColor: "#ffffff",
            borderWidth: 4,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "68%",
        plugins: { legend: { display: false } },
      },
    }),
    [data],
  );

  return (
    <section className="clientes-panel clientes-gender-panel">
      <div className="clientes-panel-heading">
        <div>
          <h2>
            <span className="material-symbols-outlined" aria-hidden="true">wc</span>
            Clientes por genero
          </h2>
          <p>Distribucion demografica y corporativa.</p>
        </div>
      </div>
      <ChartCanvas ariaLabel="Clientes por genero" config={config} />
      <div className="clientes-legend">
        {data.map(([label, value, color]) => (
          <span key={label}>
            <i style={{ backgroundColor: color }} aria-hidden="true" />
            {label}
            <strong>{value}%</strong>
          </span>
        ))}
      </div>
    </section>
  );
}

export default ClientesPorGenero;
