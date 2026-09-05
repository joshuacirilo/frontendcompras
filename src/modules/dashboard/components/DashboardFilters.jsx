function DashboardFilters({ filters, onApply, onReset }) {
  return (
    <section className="dashboard-panel filter-panel">
      <form className="filter-form" onReset={onReset} onSubmit={onApply}>
        <div className="panel-title-row">
          <h2>
            <span className="material-symbols-outlined" aria-hidden="true">
              filter_alt
            </span>
            Filtros Globales de Consulta
          </h2>
          <span className="mono-muted">ISO-GTQ - 2024</span>
        </div>

        <div className="filter-grid">
          <label>
            Fecha Inicial
            <input defaultValue="2024-01-01" type="date" />
          </label>
          <label>
            Fecha Final
            <input defaultValue="2024-03-31" type="date" />
          </label>
          <label>
            Cliente
            <select defaultValue={filters.clientes[0]}>
              {filters.clientes.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label>
            Categoria
            <select defaultValue={filters.categorias[0]}>
              {filters.categorias.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label>
            Producto
            <select defaultValue={filters.productos[0]}>
              {filters.productos.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="filter-actions">
          <div className="filter-note">
            <span className="material-symbols-outlined" aria-hidden="true">
              check_circle
            </span>
            <span>Periodo pre-cargado: Trimestre 1 (Ene - Mar 2024)</span>
          </div>
          <div>
            <button className="ghost-button" type="reset">
              <span className="material-symbols-outlined" aria-hidden="true">
                restart_alt
              </span>
              Limpiar filtros
            </button>
            <button className="primary-button" type="submit">
              <span className="material-symbols-outlined" aria-hidden="true">
                search
              </span>
              Aplicar filtros
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default DashboardFilters;
