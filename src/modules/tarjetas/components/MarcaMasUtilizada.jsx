function MarcaMasUtilizada({ data }) {
  return (
    <section className="tarjetas-panel tarjetas-brand-panel">
      <div className="tarjetas-panel-heading">
        <div>
          <h2>
            <span className="material-symbols-outlined" aria-hidden="true">workspace_premium</span>
            Marca mas utilizada
          </h2>
          <p>Participacion consolidada por marca emisora.</p>
        </div>
        <span className="tarjetas-leader-badge">Lider</span>
      </div>
      <div className="tarjetas-brand-feature">
        <div>
          <span className="tarjetas-brand-logo">VISA</span>
          <strong>{data.brand}</strong>
          <p>{data.detail}</p>
        </div>
        <div className="tarjetas-brand-metrics">
          <span>{data.share}%</span>
          <small>{data.transactions} transacciones</small>
          <small>{data.volume}</small>
          <small>{data.approval} aprobacion</small>
        </div>
      </div>
    </section>
  );
}

export default MarcaMasUtilizada;
