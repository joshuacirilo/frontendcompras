function MesMayorFacturacion({ peakMonth }) {
  if (!peakMonth) return null;

  return (
    <aside className="compras-side-insights">
      <article className="compras-panel insight-card">
        <div className="insight-heading">
          <div>
            <span className="material-symbols-outlined" aria-hidden="true">
              calendar_today
            </span>
            <h4>{peakMonth.title}</h4>
          </div>
          <strong>{peakMonth.badge}</strong>
        </div>
        <p>{peakMonth.description}</p>
        <div className="peak-stats">
          {peakMonth.stats.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </article>
    </aside>
  );
}

export default MesMayorFacturacion;
