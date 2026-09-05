function MesMayorFacturacion({ peakMonth, peakHours }) {
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

      <article className="compras-panel insight-card">
        <div className="insight-heading">
          <div>
            <span className="material-symbols-outlined primary" aria-hidden="true">
              schedule
            </span>
            <h4>Horas de Mayor Venta</h4>
          </div>
          <small>Franja 11h - 15h</small>
        </div>
        <p>
          El 64% del volumen transaccional diario se concentra en horas de almuerzo y ordenes
          institucionales matutinas.
        </p>
        <div className="hour-bars">
          {peakHours.map(([label, value, tone]) => (
            <div key={label}>
              <div>
                <span>{label}</span>
                <strong>{value}%</strong>
              </div>
              <b>
                <i className={tone} style={{ width: `${value}%` }} />
              </b>
            </div>
          ))}
        </div>
      </article>
    </aside>
  );
}

export default MesMayorFacturacion;
