const statusLabels = {
  available: ["check_circle", "Disponible"],
  empty: ["folder_off", "Sin datos"],
  error: ["sync_problem", "Error"],
  loading: ["hourglass_top", "Cargando"],
};

function EndpointCard({ card }) {
  const [statusIcon, statusText] = statusLabels[card.status] || statusLabels.loading;

  return (
    <article className={`endpoint-card ${card.status}`}>
      <div className="endpoint-card-header">
        <div className="endpoint-icon">
          <span className="material-symbols-outlined" aria-hidden="true">
            {card.icon}
          </span>
        </div>
        <span className="endpoint-status">
          <span className="material-symbols-outlined" aria-hidden="true">
            {statusIcon}
          </span>
          {statusText}
        </span>
      </div>

      <div className="endpoint-card-body">
        <h2>{card.title}</h2>
        <code>{card.endpoint}</code>
      </div>

      <div className="endpoint-card-meta">
        <div>
          <span>Conteo</span>
          <strong>{card.count}</strong>
        </div>
        <p>{card.detail}</p>
      </div>

      <p className="endpoint-sample">{card.sample}</p>
    </article>
  );
}

export default EndpointCard;
