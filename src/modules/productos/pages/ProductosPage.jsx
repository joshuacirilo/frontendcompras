import { useMemo, useState } from "react";
import ProductosMayoresIngresos from "../components/ProductosMayoresIngresos";
import ProductosNuncaComprados from "../components/ProductosNuncaComprados";
import ProductosPorCategoria from "../components/ProductosPorCategoria";
import ProductosTable from "../components/ProductosTable";
import TopProductosMasVendidos from "../components/TopProductosMasVendidos";
import { getProductosData } from "../services/productosService";
import "../../dashboard/styles/dashboard.css";

const viewModes = [
  ["normal", "Datos disponibles"],
  ["loading", "Loading"],
  ["empty", "Sin resultados"],
  ["error", "Error"],
];

function ProductosKpiCard({ kpi }) {
  return (
    <article className={`productos-kpi-card ${kpi.tone}`}>
      <div className="productos-kpi-orb" aria-hidden="true" />
      <div>
        <div className="productos-kpi-top">
          <span>{kpi.label}</span>
          <span className="material-symbols-outlined" aria-hidden="true">{kpi.icon}</span>
        </div>
        <strong>{kpi.value}</strong>
      </div>
      <div className="productos-kpi-footer">
        <span>{kpi.detail}</span>
        <b>{kpi.trend}</b>
      </div>
    </article>
  );
}

function ProductosFilters({ filters, onApply, onReset }) {
  return (
    <form className="productos-filter-bar" onSubmit={onApply}>
      <div className="productos-filter-group">
        <label>
          <span className="material-symbols-outlined" aria-hidden="true">date_range</span>
          <select defaultValue={filters.fechas[0]} aria-label="Fecha">
            {filters.fechas.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span className="material-symbols-outlined" aria-hidden="true">inventory_2</span>
          <select defaultValue={filters.productos[0]} aria-label="Producto">
            {filters.productos.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span className="material-symbols-outlined" aria-hidden="true">category</span>
          <select defaultValue={filters.categorias[0]} aria-label="Categoria">
            {filters.categorias.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span className="material-symbols-outlined" aria-hidden="true">payments</span>
          <select defaultValue={filters.precios[0]} aria-label="Rango de precio">
            {filters.precios.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span className="material-symbols-outlined" aria-hidden="true">sync_alt</span>
          <select defaultValue={filters.rotacion[0]} aria-label="Rotacion">
            {filters.rotacion.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>
      <div className="productos-filter-actions">
        <button type="button" onClick={onReset} title="Restablecer filtros" aria-label="Restablecer filtros">
          <span className="material-symbols-outlined" aria-hidden="true">restart_alt</span>
        </button>
        <i aria-hidden="true" />
        <span>Filtro: 1,240 SKUs</span>
      </div>
    </form>
  );
}

function ProductosStatePanel({ type, onReset }) {
  const content = {
    loading: ["hourglass_top", "Cargando productos", "Preparando KPIs, graficas y catalogo maestro de productos."],
    empty: ["folder_off", "Sin resultados para los filtros", "No hay productos disponibles para la fecha, producto o categoria seleccionada."],
    error: ["sync_problem", "Error al sincronizar productos", "No fue posible consultar los datos temporales del modulo. Reintenta la consulta."],
  }[type];

  return (
    <section className={`productos-state-panel ${type}`}>
      <span className="material-symbols-outlined" aria-hidden="true">{content[0]}</span>
      <h2>{content[1]}</h2>
      <p>{content[2]}</p>
      <button type="button" onClick={onReset}>Restablecer vista</button>
    </section>
  );
}

function ProductosPage({ onBackToDashboard }) {
  const data = useMemo(() => getProductosData(), []);
  const [viewMode, setViewMode] = useState("normal");

  function handleApplyFilters(event) {
    event.preventDefault();
    setViewMode("loading");
    window.setTimeout(() => setViewMode("normal"), 500);
  }

  function handleResetFilters() {
    setViewMode("normal");
  }

  return (
    <div className="productos-page">
      <header className="productos-heading">
        <div>
          <nav aria-label="Ruta actual">
            <button type="button" onClick={onBackToDashboard}>
              <span className="material-symbols-outlined" aria-hidden="true">dashboard</span>
              Dashboard
            </button>
            <span className="material-symbols-outlined" aria-hidden="true">chevron_right</span>
            <strong>Productos</strong>
          </nav>
          <div className="productos-title-row">
            <h1>Productos / Analisis</h1>
            <span>Catalogo v2.4</span>
          </div>
          <p>Desempeno de inventario comercial, rotacion de productos e ingresos generados.</p>
        </div>
        <div className="productos-header-actions">
          <button type="button">
            <span className="material-symbols-outlined" aria-hidden="true">history</span>
            Auditoria de Stock
          </button>
          <button className="primary" type="button">
            <span className="material-symbols-outlined" aria-hidden="true">add_circle</span>
            Nuevo Producto
          </button>
        </div>
      </header>

      <ProductosFilters filters={data.filters} onApply={handleApplyFilters} onReset={handleResetFilters} />

      <div className="productos-view-switcher" aria-label="Seleccionar estado visual de productos">
        {viewModes.map(([mode, label]) => (
          <button className={viewMode === mode ? "is-active" : ""} key={mode} onClick={() => setViewMode(mode)} type="button">
            {label}
          </button>
        ))}
      </div>

      {viewMode === "normal" ? (
        <>
          <section className="productos-kpi-grid">
            {data.kpis.map((kpi) => <ProductosKpiCard key={kpi.label} kpi={kpi} />)}
          </section>
          <section className="productos-visual-grid">
            <TopProductosMasVendidos data={data.topSold} />
            <ProductosMayoresIngresos data={data.topRevenue} />
          </section>
          <section className="productos-visual-grid">
            <ProductosPorCategoria data={data.categories} />
            <ProductosNuncaComprados products={data.neverPurchased} />
          </section>
          <ProductosTable products={data.products} total={data.kpis[0].value} />
        </>
      ) : (
        <ProductosStatePanel type={viewMode} onReset={handleResetFilters} />
      )}
    </div>
  );
}

export default ProductosPage;
