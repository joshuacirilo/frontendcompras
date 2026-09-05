function CategoriasKpiCard({ kpi }) {
  return (
    <article className={`categorias-kpi-card ${kpi.tone}`}>
      <div className="categorias-kpi-orb" aria-hidden="true" />
      <div className="categorias-kpi-top">
        <span>{kpi.label}</span>
        <span className="material-symbols-outlined" aria-hidden="true">{kpi.icon}</span>
      </div>
      <div className="categorias-kpi-main">
        <strong>{kpi.value}</strong>
        <span>{kpi.detail}</span>
      </div>
      <div className="categorias-kpi-footer">
        <b>{kpi.trend}</b>
      </div>
    </article>
  );
}

export default CategoriasKpiCard;
