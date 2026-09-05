function Header() {
  return (
    <header className="dashboard-header">
      <div className="header-brand">
        <div className="brand-mark">DBA</div>
        <div className="breadcrumb">
          <span>DBA Enterprise</span>
          <span className="breadcrumb-separator">/</span>
          <strong>Workspace Global</strong>
        </div>
        <label className="header-search" aria-label="Buscar en el dashboard">
          <span className="material-symbols-outlined" aria-hidden="true">
            search
          </span>
          <input type="search" placeholder="Buscar transacciones, SKUs, clientes..." />
        </label>
      </div>

      <div className="header-actions">
        <div className="period-chip">
          <span className="material-symbols-outlined" aria-hidden="true">
            calendar_today
          </span>
          <span>Ultimos 30 dias</span>
        </div>
        <button className="ghost-button export-button" type="button">
          <span className="material-symbols-outlined" aria-hidden="true">
            file_download
          </span>
          <span>Exportar Informe</span>
        </button>
        <button className="icon-button notification-button" type="button" aria-label="Notificaciones">
          <span className="material-symbols-outlined" aria-hidden="true">
            notifications
          </span>
        </button>
        <div className="user-summary" aria-label="Usuario actual">
          <div className="user-avatar">
            <span className="material-symbols-outlined" aria-hidden="true">
              person
            </span>
          </div>
          <div>
            <strong>Carlos Mendoza</strong>
            <span>Analista Senior</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
