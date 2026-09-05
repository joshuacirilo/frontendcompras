import { useMemo, useState } from "react";
import ComprasTable from "../components/ComprasTable";
import MesMayorFacturacion from "../components/MesMayorFacturacion";
import ResumenCompras from "../components/ResumenCompras";
import TicketPromedio from "../components/TicketPromedio";
import VentasPorAnio from "../components/VentasPorAnio";
import VentasPorMes from "../components/VentasPorMes";
import { getComprasData } from "../services/comprasService";

const visualStates = [
  ["normal", "Datos disponibles"],
  ["loading", "Loading"],
  ["empty", "Sin informacion"],
  ["error", "Error"],
];

function ComprasPage({ onBackToDashboard }) {
  const data = useMemo(() => getComprasData(), []);
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
    <div className="compras-page">
      <header className="compras-heading">
        <nav aria-label="Ruta actual">
          <button type="button" onClick={onBackToDashboard}>Dashboard</button>
          <span className="material-symbols-outlined" aria-hidden="true">chevron_right</span>
          <strong>Compras</strong>
          <span className="material-symbols-outlined" aria-hidden="true">chevron_right</span>
          <span>Analisis Financiero</span>
        </nav>
        <div className="compras-heading-main">
          <div>
            <div className="compras-title-row">
              <h1>Compras / Analisis</h1>
              <span>Audit Ready</span>
            </div>
            <p>
              Control transaccional detallado, evolucion historica de ventas y auditoria de tickets
              de compra fiscalizados.
            </p>
          </div>
          <div className="compras-header-actions">
            <button type="button">
              <span className="material-symbols-outlined" aria-hidden="true">tune</span>
              Configurar Filtros
            </button>
            <button className="primary" type="button">
              <span className="material-symbols-outlined" aria-hidden="true">receipt</span>
              Nueva Compra
            </button>
          </div>
        </div>
      </header>

      <form className="compras-filter-panel" onSubmit={handleApplyFilters}>
        <div className="compras-filter-top">
          <div>
            <span className="material-symbols-outlined" aria-hidden="true">filter_alt</span>
            Parametros de Auditoria y Filtros Avanzados
          </div>
          <button type="button" onClick={handleResetFilters}>
            <span className="material-symbols-outlined" aria-hidden="true">restart_alt</span>
            Restablecer
          </button>
        </div>
        <div className="compras-filter-grid">
          <label>
            Fecha inicial
            <input type="date" defaultValue="2024-02-16" />
          </label>
          <label>
            Fecha final
            <input type="date" defaultValue="2024-03-17" />
          </label>
          <label>
            Cliente
            <select defaultValue={data.filters.clientes[0]}>
              {data.filters.clientes.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            Producto
            <select defaultValue={data.filters.productos[0]}>
              {data.filters.productos.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            Categoria
            <select defaultValue={data.filters.categorias[0]}>
              {data.filters.categorias.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>
      </form>

      <div className="compras-view-switcher" aria-label="Seleccionar estado visual de compras">
        {visualStates.map(([mode, label]) => (
          <button
            className={viewMode === mode ? "is-active" : ""}
            key={mode}
            onClick={() => setViewMode(mode)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>

      {viewMode === "normal" ? (
        <>
          <ResumenCompras kpis={data.kpis} />
          <VentasPorMes data={data.monthlySales} />
          <div className="compras-analytics-grid">
            <VentasPorAnio data={data.yearlySales} />
            <MesMayorFacturacion peakMonth={data.peakMonth} peakHours={data.peakHours} />
          </div>
          <TicketPromedio />
          <ComprasTable purchases={data.purchases} total="12,540" />
        </>
      ) : (
        <section className={`compras-state-panel ${viewMode}`}>
          <span className="material-symbols-outlined" aria-hidden="true">
            {viewMode === "loading" ? "hourglass_top" : viewMode === "empty" ? "folder_off" : "sync_problem"}
          </span>
          <h3>
            {viewMode === "loading"
              ? "Cargando compras"
              : viewMode === "empty"
                ? "Sin informacion para los filtros"
                : "Error al sincronizar compras"}
          </h3>
          <p>
            {viewMode === "loading"
              ? "Preparando indicadores, graficas y registro maestro de transacciones."
              : viewMode === "empty"
                ? "No hay transacciones disponibles para el rango, cliente, producto o categoria seleccionados."
                : "No fue posible consultar los datos temporales del modulo. Reintenta la consulta."}
          </p>
          <button type="button" onClick={handleResetFilters}>Restablecer vista</button>
        </section>
      )}
    </div>
  );
}

export default ComprasPage;
