import { EMPTY_FILTERS } from "../../config/apiContract";

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 8 }, (_, index) => String(currentYear - index));
const MONTHS = [
  { value: "1", label: "Enero" },
  { value: "2", label: "Febrero" },
  { value: "3", label: "Marzo" },
  { value: "4", label: "Abril" },
  { value: "5", label: "Mayo" },
  { value: "6", label: "Junio" },
  { value: "7", label: "Julio" },
  { value: "8", label: "Agosto" },
  { value: "9", label: "Septiembre" },
  { value: "10", label: "Octubre" },
  { value: "11", label: "Noviembre" },
  { value: "12", label: "Diciembre" },
];

function FilterBar({ value = EMPTY_FILTERS, onChange, onApply, onReset }) {
  function updateField(field, nextValue) {
    onChange?.({ ...value, [field]: nextValue });
  }

  return (
    <section className="dashboard-panel" aria-label="Filtros del tablero">
      <div className="filter-grid">
        <label>
          Ano (compras)
          <select value={value.anio || ""} onChange={(event) => updateField("anio", event.target.value)}>
            <option value="">Todos</option>
            {YEARS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
        <label>
          Mes (promedio)
          <select value={value.mes || ""} onChange={(event) => updateField("mes", event.target.value)}>
            <option value="">Todos</option>
            {MONTHS.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="filter-actions" style={{ display: "flex", marginTop: "0.75rem" }}>
        <div className="filter-note">
          <span className="material-symbols-outlined" aria-hidden="true">
            info
          </span>
          Filtros enviados a la API: anio y mes.
        </div>
        <div>
          <button className="ghost-button" type="button" onClick={onReset}>
            Limpiar
          </button>
          <button className="primary-button" type="button" onClick={onApply}>
            Aplicar
          </button>
        </div>
      </div>
    </section>
  );
}

export default FilterBar;
