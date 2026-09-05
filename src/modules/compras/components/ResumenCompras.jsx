function ResumenCompras({ kpis }) {
  return (
    <section className="compras-kpi-grid" aria-label="Indicadores principales de compras">
      {kpis.map((kpi) => (
        <article className="compras-kpi-card" key={kpi.label}>
          <div className="compras-kpi-top">
            <span>{kpi.label}</span>
            <strong className={kpi.success ? "success" : ""}>
              {kpi.badgeIcon ? (
                <span className="material-symbols-outlined" aria-hidden="true">
                  {kpi.badgeIcon}
                </span>
              ) : null}
              {kpi.badge}
            </strong>
          </div>
          <div className="compras-kpi-body">
            <b className={kpi.highlighted ? "highlighted" : kpi.success ? "success" : ""}>
              {kpi.value}
            </b>
            <span>{kpi.detail}</span>
          </div>
          {kpi.progress ? (
            <div className="compras-kpi-progress">
              <div>
                <span style={{ width: `${kpi.progress}%` }} />
              </div>
              <small>{kpi.footerLeft}</small>
            </div>
          ) : (
            <div className="compras-kpi-footer">
              <span>{kpi.footerLeft}</span>
              <strong>{kpi.footerRight}</strong>
            </div>
          )}
        </article>
      ))}
    </section>
  );
}

export default ResumenCompras;
