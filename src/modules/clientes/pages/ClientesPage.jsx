import { useMemo, useState } from "react";
import ClientesPorGenero from "../components/ClientesPorGenero";
import ClientesSinCompras from "../components/ClientesSinCompras";
import ClientesTable from "../components/ClientesTable";
import TopClientesPorCompras from "../components/TopClientesPorCompras";
import TopClientesPorMonto from "../components/TopClientesPorMonto";
import { getClientesData } from "../services/clientesService";

const viewModes = [
  ["normal", "Datos disponibles"],
  ["loading", "Loading"],
  ["empty", "Sin datos"],
  ["error", "Error"],
];

function ClientesKpiCard({ kpi }) {
  return (
    <article className={kpi.highlighted ? "clientes-kpi-card is-highlighted" : "clientes-kpi-card"}>
      <div className="clientes-kpi-top">
        <span>{kpi.label}</span>
        <div className={`clientes-kpi-icon ${kpi.tone}`}>
          <span className="material-symbols-outlined" aria-hidden="true">{kpi.icon}</span>
        </div>
      </div>
      <div className="clientes-kpi-body">
        <b>{kpi.value}</b>
        <span>
          <span className="material-symbols-outlined" aria-hidden="true">arrow_upward</span>
          {kpi.trend}
        </span>
      </div>
      <div className="clientes-kpi-note">{kpi.detail}</div>
    </article>
  );
}

function ClientesStatePanel({ type, onReset }) {
  const content = {
    loading: ["hourglass_top", "Cargando clientes", "Preparando KPIs, graficas y directorio maestro de clientes."],
    empty: ["folder_off", "Sin datos para los filtros", "No hay clientes disponibles para el rango de fecha o cliente seleccionado."],
    error: ["sync_problem", "Error al sincronizar clientes", "No fue posible consultar los datos temporales del modulo. Reintenta la consulta."],
  }[type];

  return (
    <section className={`clientes-state-panel ${type}`}>
      <span className="material-symbols-outlined" aria-hidden="true">{content[0]}</span>
      <h2>{content[1]}</h2>
      <p>{content[2]}</p>
      <button type="button" onClick={onReset}>Restablecer vista</button>
    </section>
  );
}

function ClientesPage({ onBackToDashboard }) {
  const data = useMemo(() => getClientesData(), []);
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
    <div className="clientes-page">
      <header className="clientes-heading">
        <div className="clientes-breadcrumb-actions">
          <nav aria-label="Ruta actual">
            <button type="button" onClick={onBackToDashboard}>
              <span className="material-symbols-outlined" aria-hidden="true">dashboard</span>
              Dashboard
            </button>
            <span className="material-symbols-outlined" aria-hidden="true">chevron_right</span>
            <strong>Clientes</strong>
            <span className="material-symbols-outlined" aria-hidden="true">chevron_right</span>
            <span>Analisis y Segmentacion</span>
          </nav>
          <div className="clientes-header-actions">
            <button type="button">
              <span className="material-symbols-outlined" aria-hidden="true">download</span>
              Exportar Cohortes
            </button>
            <button className="primary" type="button">
              <span className="material-symbols-outlined" aria-hidden="true">person_add</span>
              Nuevo Cliente
            </button>
          </div>
        </div>

        <div className="clientes-title-block">
          <div>
            <span aria-hidden="true" />
            <h1>Clientes / Analisis</h1>
            <strong>Metrica Auditada</strong>
          </div>
          <p>Segmentacion, recurrencia, habitos de compra y comportamiento integral del consumidor retail y mayorista.</p>
        </div>
      </header>

      <form className="clientes-filter-bar" onSubmit={handleApplyFilters}>
        <div className="clientes-filter-group">
          <label>
            <span className="material-symbols-outlined" aria-hidden="true">date_range</span>
            <small>Rango Fechas</small>
            <select defaultValue={data.filters.fechas[0]}>{data.filters.fechas.map((item) => <option key={item}>{item}</option>)}</select>
          </label>
          <label>
            <span className="material-symbols-outlined" aria-hidden="true">group</span>
            <small>Cliente</small>
            <select defaultValue={data.filters.clientes[0]}>{data.filters.clientes.map((item) => <option key={item}>{item}</option>)}</select>
          </label>
          <label>
            <span className="material-symbols-outlined" aria-hidden="true">military_tech</span>
            <small>Segmento</small>
            <select defaultValue={data.filters.segmentos[0]}>{data.filters.segmentos.map((item) => <option key={item}>{item}</option>)}</select>
          </label>
          <label>
            <span className="material-symbols-outlined" aria-hidden="true">payments</span>
            <small>Rango de Consumo</small>
            <select defaultValue={data.filters.consumos[0]}>{data.filters.consumos.map((item) => <option key={item}>{item}</option>)}</select>
          </label>
          <label>
            <span className="material-symbols-outlined" aria-hidden="true">wc</span>
            <small>Genero</small>
            <select defaultValue={data.filters.generos[0]}>{data.filters.generos.map((item) => <option key={item}>{item}</option>)}</select>
          </label>
          <label>
            <span className="material-symbols-outlined" aria-hidden="true">toggle_on</span>
            <small>Estado</small>
            <select defaultValue={data.filters.estados[0]}>{data.filters.estados.map((item) => <option key={item}>{item}</option>)}</select>
          </label>
        </div>
        <div className="clientes-filter-actions">
          <button type="button" onClick={handleResetFilters}>Limpiar</button>
          <button className="apply" type="submit">
            <span className="material-symbols-outlined" aria-hidden="true">filter_list</span>
            Aplicar
          </button>
        </div>
      </form>

      <div className="clientes-view-switcher" aria-label="Seleccionar estado visual de clientes">
        {viewModes.map(([mode, label]) => (
          <button className={viewMode === mode ? "is-active" : ""} key={mode} onClick={() => setViewMode(mode)} type="button">
            {label}
          </button>
        ))}
      </div>

      {viewMode === "normal" ? (
        <>
          <section className="clientes-kpi-grid">
            {data.kpis.map((kpi) => <ClientesKpiCard key={kpi.label} kpi={kpi} />)}
          </section>

          <section className="clientes-report-grid">
            <TopClientesPorMonto data={data.topByAmount} />
            <TopClientesPorCompras data={data.topByPurchases} />
          </section>

          <section className="clientes-lower-grid">
            <ClientesSinCompras clients={data.inactiveClients} />
            <ClientesPorGenero data={data.genderShare} />
          </section>

          <ClientesTable clients={data.clients} />
        </>
      ) : (
        <ClientesStatePanel type={viewMode} onReset={handleResetFilters} />
      )}
    </div>
  );
}

export default ClientesPage;
