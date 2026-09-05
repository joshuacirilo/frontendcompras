function CategoriasYoYPanel({ data }) {
  return (
    <article className="categorias-panel categorias-yoy-panel">
      <div className="categorias-panel-heading">
        <div>
          <h2>
            <span className="material-symbols-outlined" aria-hidden="true">monitoring</span>
            Variacion y concentracion comercial
          </h2>
          <p>Lectura YoY por linea para detectar crecimiento, estancamiento o riesgo.</p>
        </div>
      </div>
      <div className="categorias-yoy-list">
        {data.map(([name, trend, width, tone]) => (
          <div className={`categorias-yoy-item ${tone}`} key={name}>
            <div>
              <strong>{name}</strong>
              <span>{trend}</span>
            </div>
            <div className="categorias-yoy-track">
              <i style={{ width: `${width}%` }} />
            </div>
          </div>
        ))}
      </div>
      <footer>
        <span>Tasa ponderada corporativa YoY: <strong>+14.8%</strong> en ventas brutas.</span>
        <button type="button">Auditoria YoY Detallada</button>
      </footer>
    </article>
  );
}

export default CategoriasYoYPanel;
