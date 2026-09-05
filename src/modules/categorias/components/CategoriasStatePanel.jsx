function CategoriasStatePanel({ type, onReset }) {
  const content = {
    loading: ["hourglass_top", "Cargando categorias", "Preparando KPIs, participacion porcentual y matriz de desempeno."],
    empty: ["folder_off", "Sin datos para los filtros", "No hay categorias disponibles para la fecha o categoria seleccionada."],
    error: ["sync_problem", "Error al sincronizar categorias", "No fue posible consultar los datos temporales del modulo. Reintenta la consulta."],
  }[type];

  return (
    <section className={`categorias-state-panel ${type}`}>
      <span className="material-symbols-outlined" aria-hidden="true">{content[0]}</span>
      <h2>{content[1]}</h2>
      <p>{content[2]}</p>
      <button type="button" onClick={onReset}>Restablecer vista</button>
    </section>
  );
}

export default CategoriasStatePanel;
