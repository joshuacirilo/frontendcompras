const navigationItems = [
  { label: "Dashboard General", icon: "bar_chart", page: "dashboard" },
  { label: "Clientes", icon: "group", page: "clientes" },
  { label: "Productos", icon: "inventory_2", page: "productos" },
  { label: "Categorias", icon: "layers", page: "categorias" },
  { label: "Compras", icon: "receipt_long", page: "compras" },
  { label: "Tarjetas", icon: "credit_card", page: "tarjetas" },
];

function Sidebar({ activePage = "dashboard", onNavigate }) {
  return (
    <aside className="dashboard-sidebar">
      <div>
        <div className="sidebar-logo">
          <div className="brand-mark">DBA</div>
          <div>
            <strong>DBA COMPRAS</strong>
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

      <div className="sidebar-footer" />
    </aside>
  );
}

export default Sidebar;
