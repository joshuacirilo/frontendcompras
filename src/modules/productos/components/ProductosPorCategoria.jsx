function ProductosPorCategoria({ data }) {
  return (
    <section className="productos-panel productos-category-panel">
      <div className="productos-panel-heading">
        <div>
          <h2>Productos por Categoria</h2>
          <p>Distribucion porcentual de catalogo y aportacion en ventas</p>
        </div>
        <button className="productos-icon-button" type="button" aria-label="Mas opciones de categorias">
          <span className="material-symbols-outlined" aria-hidden="true">more_vert</span>
        </button>
      </div>

      <div className="productos-stacked-bar" aria-label="Distribucion de productos por categoria">
        {data.map(([name, , percent, , color]) => (
          <span key={name} style={{ background: color, width: `${percent}%` }} title={`${name}: ${percent}%`} />
        ))}
      </div>

      <div className="productos-category-grid">
        {data.map(([name, skus, percent, revenue, color]) => (
          <article className="productos-category-item" key={name}>
            <i style={{ background: color }} />
            <div>
              <strong>{name}</strong>
              <span>{skus} SKUs - {percent.toFixed(1)}%</span>
              <b>{revenue}</b>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProductosPorCategoria;
