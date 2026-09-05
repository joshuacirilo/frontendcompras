function ProductosNuncaComprados({ products }) {
  return (
    <section className="productos-panel productos-alert-panel">
      <div className="productos-panel-heading">
        <div className="productos-alert-title">
          <div className="productos-alert-icon">
            <span className="material-symbols-outlined" aria-hidden="true">inventory</span>
          </div>
          <div>
            <h2>
              Productos Nunca Comprados
              <span>48 Alertas</span>
            </h2>
            <p>Articulos con inventario inmovilizado sin transacciones</p>
          </div>
        </div>
        <a href="#">Ver Todos</a>
      </div>

      <div className="productos-mini-table-scroll">
        <table className="productos-mini-table">
          <thead>
            <tr>
              <th>SKU / Producto</th>
              <th>Categoria</th>
              <th>Ingreso</th>
              <th className="is-right">Precio</th>
              <th className="is-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            {products.map(([sku, name, category, date, price]) => (
              <tr key={sku}>
                <td>
                  <strong>{name}</strong>
                  <small>{sku}</small>
                </td>
                <td>{category}</td>
                <td className="muted-mono">{date}</td>
                <td className="is-right mono-strong">{price}</td>
                <td className="is-center"><span>Sin movimiento</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="productos-alert-footer">
        <span>Capital estancado estimado:</span>
        <strong>Q 42,910.00</strong>
      </div>
    </section>
  );
}

export default ProductosNuncaComprados;
