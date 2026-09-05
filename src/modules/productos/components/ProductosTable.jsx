const rotationMeta = {
  high: ["bolt", "alta"],
  medium: ["sync", "media"],
  low: ["south", "baja"],
  none: ["block", "sin-venta"],
};

function ProductosTable({ products, total }) {
  return (
    <section className="productos-table-panel">
      <div className="productos-table-header">
        <div className="productos-table-controls">
        </div>
        <div className="productos-table-actions">
          <button type="button">
            <span className="material-symbols-outlined" aria-hidden="true">description</span>
            CSV
          </button>
          <button className="excel" type="button">
            <span className="material-symbols-outlined" aria-hidden="true">table_view</span>
            Exportar a Excel
          </button>
        </div>
      </div>

      <div className="productos-table-scroll">
        <table className="productos-table">
          <thead>
            <tr>
              <th><input type="checkbox" aria-label="Seleccionar todos los productos" /></th>
              <th>Codigo SKU</th>
              <th>Nombre de Producto</th>
              <th>Categoria</th>
              <th className="is-right">Precio Unit. (Q)</th>
              <th className="is-right">Uds. Vendidas</th>
              <th className="is-right">Ingresos Totales (Q)</th>
              <th className="is-right">Stock Disp.</th>
              <th className="is-center">Estado de Rotacion</th>
              <th className="is-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(([sku, name, category, price, sold, revenue, stock, status, tone]) => {
              const [icon, className] = rotationMeta[tone];

              return (
                <tr className={tone === "none" ? "has-alert" : ""} key={sku}>
                  <td><input type="checkbox" aria-label={`Seleccionar ${name}`} /></td>
                  <td className={tone === "none" ? "sku danger" : "sku"}>{sku}</td>
                  <td>
                    <div className="productos-name">
                      <i className={className} />
                      <span>{name}</span>
                    </div>
                  </td>
                  <td>{category}</td>
                  <td className="is-right mono">{price}</td>
                  <td className="is-right mono strong">{sold}</td>
                  <td className={tone === "none" ? "is-right mono muted" : "is-right mono strong"}>{revenue}</td>
                  <td className={tone === "none" ? "is-right mono danger" : "is-right mono"}>{stock}</td>
                  <td className="is-center">
                    <span className={`rotation-pill ${className}`}>
                      <span className="material-symbols-outlined" aria-hidden="true">{icon}</span>
                      {status}
                    </span>
                  </td>
                  <td className="is-center">
                    <button className="productos-row-action" type="button" aria-label={`Ver ${name}`}>
                      <span className="material-symbols-outlined" aria-hidden="true">
                        {tone === "none" ? "campaign" : "visibility"}
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <footer className="productos-pagination">
        <span>Mostrando <strong>1 - 6</strong> de <strong>{total}</strong> productos</span>
        <nav aria-label="Paginacion de productos">
          <button disabled type="button"><span className="material-symbols-outlined" aria-hidden="true">first_page</span></button>
          <button disabled type="button"><span className="material-symbols-outlined" aria-hidden="true">chevron_left</span></button>
          <strong>1</strong>
          <button type="button">2</button>
          <button type="button">3</button>
          <span>...</span>
          <button type="button">50</button>
          <button type="button"><span className="material-symbols-outlined" aria-hidden="true">chevron_right</span></button>
          <button type="button"><span className="material-symbols-outlined" aria-hidden="true">last_page</span></button>
        </nav>
      </footer>
    </section>
  );
}

export default ProductosTable;
