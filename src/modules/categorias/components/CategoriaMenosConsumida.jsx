function CategoriaMenosConsumida({ category }) {
  return (
    <article className="categorias-panel categorias-risk-panel">
      <div className="categorias-panel-heading">
        <div>
          <h2>
            <span className="material-symbols-outlined" aria-hidden="true">warning_amber</span>
            Categoria menos consumida
          </h2>
          <p>Linea critica por baja rotacion y menor participacion comercial.</p>
        </div>
        <span className="material-symbols-outlined" aria-hidden="true">{category.icon}</span>
      </div>
      <div className="categorias-feature-card">
        <div>
          <small>{category.code} - Critico</small>
          <strong>{category.name}</strong>
          <span>{category.trend}</span>
        </div>
        <div>
          <b>{category.amount}</b>
          <span>{category.purchases} compras</span>
        </div>
      </div>
      <div className="categorias-progress-row danger">
        <span>Volumen global</span>
        <strong>{category.share}%</strong>
      </div>
      <div className="categorias-progress-track danger">
        <i style={{ width: `${Math.max(category.share, 2)}%` }} />
      </div>
    </article>
  );
}

export default CategoriaMenosConsumida;
