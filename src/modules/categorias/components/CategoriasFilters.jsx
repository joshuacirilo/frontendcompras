function CategoriasFilters({ filters, onApply, onReset }) {
  return (
    <form className="categorias-filter-bar" onSubmit={onApply}>
      <div className="categorias-filter-group">
        <label>
          <span className="material-symbols-outlined" aria-hidden="true">date_range</span>
          <select defaultValue={filters.fechas[0]} aria-label="Fecha">
            {filters.fechas.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span className="material-symbols-outlined" aria-hidden="true">layers</span>
          <select defaultValue={filters.categorias[0]} aria-label="Categoria">
            {filters.categorias.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>
      <div className="categorias-filter-status">
        <button type="button" onClick={onReset} title="Restablecer filtros" aria-label="Restablecer filtros">
          <span className="material-symbols-outlined" aria-hidden="true">restart_alt</span>
        </button>
        <span className="material-symbols-outlined" aria-hidden="true">check_circle</span>
        <span>18 Categorias Auditadas en Vivo</span>
      </div>
    </form>
  );
}

export default CategoriasFilters;
