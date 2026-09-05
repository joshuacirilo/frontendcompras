import ChartCanvas from "../../dashboard/components/ChartCanvas";

function CreditoVsDebito({ data }) {
  const config = {
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
      cutout: "68%",
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: (item) => `${item.label}: ${item.raw}%` } },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  };

  return (
    <section className="tarjetas-panel tarjetas-donut-panel">
      <div className="tarjetas-panel-heading">
        <div>
          <h2>
            <span className="material-symbols-outlined" aria-hidden="true">donut_large</span>
            Credito vs Debito
          </h2>
          <p>Distribucion por modalidad de plastico.</p>
        </div>
      </div>
      <div className="tarjetas-donut-wrap">
        <ChartCanvas
          ariaLabel="Grafica de dona credito versus debito"
          config={config}
          fallback={<div className="donut-fallback payment-donut"><strong>64%</strong><span>Credito</span></div>}
        />
        <div className="tarjetas-donut-center" aria-hidden="true">
          <strong>64%</strong>
          <span>Credito</span>
        </div>
      </div>
      <div className="tarjetas-legend">
        {data.map(([label, value, color]) => (
          <span key={label}>
            <i style={{ background: color }} />
            {label}
            <b>{value}%</b>
          </span>
        ))}
      </div>
    </section>
  );
}

export default CreditoVsDebito;
