import { useMemo, useState } from "react";
import ProductosMayoresIngresos from "../components/ProductosMayoresIngresos";
import ProductosNuncaComprados from "../components/ProductosNuncaComprados";
import ProductosPorCategoria from "../components/ProductosPorCategoria";
import ProductosTable from "../components/ProductosTable";
import TopProductosMasVendidos from "../components/TopProductosMasVendidos";
import { getProductosData } from "../services/productosService";
import "../../dashboard/styles/dashboard.css";

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

function ProductosStatePanel({ type, onReset }) {
  const content = {
    loading: ["hourglass_top", "Cargando productos", "Preparando KPIs, graficas y catalogo maestro de productos."],
    empty: ["folder_off", "Sin resultados disponibles", "La API no devolvio productos disponibles para mostrar."],
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
