function KpiCard({ data }) {
  return (
    <article className={data.highlighted ? "kpi-card is-highlighted" : "kpi-card"}>
      <div className="kpi-card-header">
        <span>{data.label}</span>
        <div className="kpi-icon">
          <span className="material-symbols-outlined" aria-hidden="true">
            {data.icon}
          </span>
        </div>
      </div>
      <strong className="kpi-value">{data.value}</strong>
      <div className="kpi-meta">
        <span className="metric-pill">
          <span className="material-symbols-outlined" aria-hidden="true">
            arrow_upward
          </span>
          {data.trend}
        </span>
        <span>{data.detail}</span>
      </div>
    </article>
  );
}

export default KpiCard;
