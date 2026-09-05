const navigationItems = [
  { label: "Dashboard General", icon: "bar_chart", page: "dashboard" },
  { label: "Clientes", icon: "group" },
  { label: "Productos", icon: "inventory_2" },
  { label: "Categorias", icon: "layers" },
  { label: "Compras", icon: "receipt_long", page: "compras" },
  { label: "Tarjetas", icon: "credit_card" },
];

function Sidebar({ activePage = "dashboard", onNavigate }) {
  return (
    <aside className="dashboard-sidebar">
      <div>
        <div className="sidebar-logo">
          <div className="brand-mark">DBA</div>
          <div>
            <strong>DBA COMPRAS</strong>
            <span>Analytics v2.4</span>
          </div>
        </div>

        <div className="sidebar-label">Navegacion Principal</div>
        <nav className="sidebar-nav" aria-label="Navegacion principal">
          {navigationItems.map((item) => {
            const isActive = item.page === activePage;

            return (
            <a
              aria-current={isActive ? "page" : undefined}
              className={isActive ? "sidebar-link is-active" : "sidebar-link"}
              href="#"
              key={item.label}
              onClick={(event) => {
                if (!item.page) return;
                event.preventDefault();
                onNavigate?.(item.page);
              }}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </a>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="sync-card">
          <span className="sync-dot" aria-hidden="true" />
          <div>
            <strong>Sync BD Activa</strong>
            <span>Latencia: 18ms</span>
          </div>
          <span className="material-symbols-outlined" aria-hidden="true">
            cloud_done
          </span>
        </div>
        <div className="sidebar-collapse-row">
          <button type="button">
            <span className="material-symbols-outlined" aria-hidden="true">
              keyboard_double_arrow_left
            </span>
            Plegar menu
          </button>
          <span>DBA v1.0</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
