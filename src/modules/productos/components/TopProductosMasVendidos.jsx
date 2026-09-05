function TopProductosMasVendidos({ data }) {
  return (
    <section className="productos-panel productos-ranking-panel">
      <div className="productos-panel-heading">
        <div>
          <h2>Top 10 Productos mas Vendidos</h2>
          <p>Por volumen de unidades distribuidas en el periodo</p>
        </div>
        <span className="material-symbols-outlined" aria-hidden="true">leaderboard</span>
      </div>

      <div className="productos-ranking-list">
        {data.map(([name, fullName, units, percent], index) => (
          <div className="productos-ranking-item" key={name}>
            <span className={index < 4 ? "is-primary" : ""}>#{index + 1}</span>
            <div title={fullName}>{name}</div>
            <div className="productos-ranking-track">
              <i style={{ width: `${percent}%` }} />
            </div>
            <strong>{units.toLocaleString("en-US")} u</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TopProductosMasVendidos;
