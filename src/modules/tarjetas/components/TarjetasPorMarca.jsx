import ChartCanvas from "../../dashboard/components/ChartCanvas";

function TarjetasPorMarca({ data }) {
  const config = {
    type: "bar",
    data: {
      labels: data.map(([brand]) => brand),
      datasets: [
        {
          label: "Participacion",
          data: data.map(([, , percent]) => percent),
          backgroundColor: data.map(([, , , color]) => color),
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    },
    options: {
      scales: {
        x: { grid: { display: false }, ticks: { color: "#444653" } },
        y: { beginAtZero: true, max: 70, grid: { color: "#e5eeff" }, ticks: { color: "#757684", callback: (value) => `${value}%` } },
      },
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: (item) => `${item.raw}% de tarjetas utilizadas` } },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  };

  return (
    <section className="tarjetas-panel tarjetas-bar-panel">
      <div className="tarjetas-panel-heading">
        <div>
          <h2>
            <span className="material-symbols-outlined" aria-hidden="true">bar_chart</span>
            Tarjetas utilizadas por marca
          </h2>
          <p>Participacion relativa sobre transacciones POS.</p>
        </div>
      </div>
      <ChartCanvas
        ariaLabel="Grafica de barras tarjetas utilizadas por marca"
        config={config}
        fallback={
          <div className="tarjetas-bars-fallback">
            {data.map(([brand, total, percent, color]) => (
              <div key={brand}>
                <span>{brand}</span>
                <i><b style={{ height: `${percent}%`, background: color }} /></i>
                <strong>{total}</strong>
              </div>
            ))}
          </div>
        }
      />
    </section>
  );
}

export default TarjetasPorMarca;
