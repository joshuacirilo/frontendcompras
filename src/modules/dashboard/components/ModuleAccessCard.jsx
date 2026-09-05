const pageByModuleName = {
  Categorias: "categorias",
  Clientes: "clientes",
  Compras: "compras",
  Productos: "productos",
  Tarjetas: "tarjetas",
};

function ModuleAccessCard({ module, onNavigate }) {
  const page = pageByModuleName[module.name];

  return (
    <a
      className="module-card"
      href={`#${page || ""}`}
      onClick={(event) => {
        if (!page) return;
        event.preventDefault();
        onNavigate?.(page);
      }}
    >
      <div className="module-card-body">
        <div className="module-card-top">
          <div className="module-icon">
            <span className="material-symbols-outlined" aria-hidden="true">
              {module.icon}
            </span>
          </div>
          <span className="module-tag">{module.tag}</span>
        </div>
        <h3>{module.name}</h3>
        <dl>
          {module.stats.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <span className="module-link">
        Ver reporte
        <span className="material-symbols-outlined" aria-hidden="true">
          arrow_forward
        </span>
      </span>
    </a>
  );
}

export default ModuleAccessCard;
