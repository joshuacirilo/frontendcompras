import { useEffect, useState } from "react";
import ClientesPorGenero from "../components/ClientesPorGenero";
import ClientesSinCompras from "../components/ClientesSinCompras";
import ClientesTable from "../components/ClientesTable";
import TopClientesPorCompras from "../components/TopClientesPorCompras";
import TopClientesPorMonto from "../components/TopClientesPorMonto";
import { getClientesData, getClientesMockData } from "../services/clientesService";

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

function ClientesStatePanel({ message, type, onReset }) {
  const content = {
    loading: ["hourglass_top", "Cargando clientes", "Preparando KPIs, graficas y directorio maestro de clientes."],
    empty: ["folder_off", "Sin datos disponibles", "La API no devolvio clientes disponibles para mostrar."],
    error: ["sync_problem", "Error al sincronizar clientes", "No fue posible consultar los datos temporales del modulo. Reintenta la consulta."],
  }[type];

  return (
    <section className={`clientes-state-panel ${type}`}>
      <span className="material-symbols-outlined" aria-hidden="true">{content[0]}</span>
      <h2>{content[1]}</h2>
      <p>{message || content[2]}</p>
      <button type="button" onClick={onReset}>Restablecer vista</button>
    </section>
  );
}

function ClientesPage({ onBackToDashboard }) {
  const [data, setData] = useState(() => getClientesMockData());
  const [viewMode, setViewMode] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  async function loadClientes(params) {
    setViewMode("loading");
    setErrorMessage("");

    try {
      const nextData = await getClientesData(params);
      setData(nextData);
      setViewMode(nextData.clients.length ? "normal" : "empty");
    } catch (error) {
      setErrorMessage(error.message);
      setViewMode("error");
    }
  }

  useEffect(() => {
    loadClientes();
  }, []);

  function handleResetFilters() {
    loadClientes();
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
        <ClientesStatePanel type={viewMode} message={errorMessage} onReset={handleResetFilters} />
      )}
    </div>
  );
}

export default ClientesPage;
