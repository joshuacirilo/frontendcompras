import ChartCanvas from "./ChartCanvas";

function CreditoDebitoChart({ data }) {
  const config = {
    type: "doughnut",
    data: {
      labels: data.map(([label]) => label),
      datasets: [
        {
          data: data.map(([, value]) => value),
          backgroundColor: data.map(([, , color]) => color),
          borderWidth: 0,
        },
      ],
    },
    options: {
      cutout: "72%",
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
    },
  };

  return (
    <section className="dashboard-panel compact-chart-panel">
      <div className="panel-title-row">
        <div>
          <h3>Credito vs Debito</h3>
          <p>Modalidad de financiamiento</p>
        </div>
        <span className="material-symbols-outlined panel-icon" aria-hidden="true">
          account_balance_wallet
        </span>
      </div>
      <ChartCanvas ariaLabel="Grafica de dona de tarjetas de credito contra debito" config={config} />
      <div className="payment-list">
        {data.map(([label, value, color]) => (
          <div key={label}>
            <span>
              <i style={{ backgroundColor: color }} />
              {label}
            </span>
            <strong>{value}%</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CreditoDebitoChart;
