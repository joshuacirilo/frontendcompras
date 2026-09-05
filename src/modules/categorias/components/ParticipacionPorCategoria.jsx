import { useEffect, useMemo, useRef } from "react";
import Chart from "chart.js/auto";

function ParticipacionPorCategoria({ data }) {
  const canvasRef = useRef(null);

  const config = useMemo(() => ({
    type: "doughnut",
    data: {
      labels: data.map((item) => item.category),
      datasets: [
        {
          data: data.map((item) => item.value),
          backgroundColor: data.map((item) => item.color),
          borderColor: "#ffffff",
          borderWidth: 3,
          hoverOffset: 8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "68%",
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => `${context.label}: ${context.parsed}%`,
          },
        },
      },
    },
  }), [data]);

  useEffect(() => {
    if (!canvasRef.current) return undefined;

    const chart = new Chart(canvasRef.current, config);
    return () => chart.destroy();
  }, [config]);

  return (
    <article className="categorias-panel categorias-chart-panel">
      <div className="categorias-panel-heading">
        <div>
          <h2>
            <span className="material-symbols-outlined" aria-hidden="true">donut_large</span>
            Participacion porcentual por categoria
          </h2>
          <p>Distribucion porcentual del monto vendido por linea comercial.</p>
        </div>
        <span>Chart.js</span>
      </div>
      <div className="categorias-chart-body">
        <div className="categorias-chart-frame">
          <canvas aria-label="Participacion porcentual por categoria" ref={canvasRef} role="img" />
        </div>
        <div className="categorias-legend">
          {data.map((item) => (
            <div key={item.category}>
              <span>
                <i style={{ background: item.color }} />
                {item.category}
              </span>
              <strong>{item.value}%</strong>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default ParticipacionPorCategoria;
