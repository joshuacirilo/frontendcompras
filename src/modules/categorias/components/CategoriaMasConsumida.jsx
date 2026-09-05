function CategoriaMasConsumida({ category }) {
  return (
    <article className="categorias-panel categorias-highlight-panel">
      <div className="categorias-panel-heading">
        <div>
          <h2>
            <span className="material-symbols-outlined" aria-hidden="true">workspace_premium</span>
            Categoria mas consumida
          </h2>
          <p>Linea con mayor volumen comercial dentro del periodo seleccionado.</p>
        </div>
        <span className="material-symbols-outlined" aria-hidden="true">{category.icon}</span>
      </div>
      <div className="categorias-feature-card">
        <div>
          <small>{category.code}</small>
          <strong>{category.name}</strong>
          <span>{category.trend}</span>
        </div>
        <div>
          <b>{category.amount}</b>
          <span>{category.purchases} compras</span>
        </div>
      </div>
      <div className="categorias-progress-row">
        <span>Participacion del total</span>
        <strong>{category.share}%</strong>
      </div>
      <div className="categorias-progress-track">
        <i style={{ width: `${category.share}%` }} />
      </div>
    </article>
  );
}

export default CategoriaMasConsumida;
