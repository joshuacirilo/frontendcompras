import { useMemo, useState } from "react";
import ClientesConComprasKpi from "../components/ClientesConComprasKpi";
import ComprasPorCategoriaChart from "../components/ComprasPorCategoriaChart";
import CreditoDebitoChart from "../components/CreditoDebitoChart";
import DashboardFilters from "../components/DashboardFilters";
import ModuleAccessCard from "../components/ModuleAccessCard";
import MontoTotalVendidoKpi from "../components/MontoTotalVendidoKpi";
import StatePanel from "../components/StatePanel";
import TarjetasPorMarcaChart from "../components/TarjetasPorMarcaChart";
import TicketPromedioKpi from "../components/TicketPromedioKpi";
import TopClientesChart from "../components/TopClientesChart";
import TopProductosChart from "../components/TopProductosChart";
import TotalComprasKpi from "../components/TotalComprasKpi";
import VentasPorMesChart from "../components/VentasPorMesChart";
import { getDashboardData } from "../services/dashboardService";
import "../styles/dashboard.css";

const viewModes = [
  ["normal", "Normal"],
  ["loading", "Skeleton"],
  ["empty", "Sin Datos"],
  ["error", "Error Sync"],
];

function DashboardPage() {
  const data = useMemo(() => getDashboardData(), []);
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
    <div className="dashboard-page">
      <section className="page-heading">
        <div>
          <div className="eyebrow-row">
            <span>Modulo Analitico</span>
            <i aria-hidden="true" />
            <span>Q1 2024 Auditado</span>
          </div>
          <h1>Dashboard General</h1>
          <p>
            Resumen general del comportamiento de compras y principales indicadores de desempeno
            comercial.
          </p>
        </div>
        <div className="view-switcher" aria-label="Seleccionar estado visual">
          <span className="material-symbols-outlined" aria-hidden="true">
            tune
          </span>
          <strong>Modo Vista:</strong>
          {viewModes.map(([mode, label]) => (
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
      </section>

      <DashboardFilters
        filters={data.filters}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />

      {viewMode === "normal" ? (
        <div className="dashboard-content">
          <section className="kpi-grid">
            <TotalComprasKpi data={data.kpis.totalCompras} />
            <ClientesConComprasKpi data={data.kpis.clientesConCompras} />
            <MontoTotalVendidoKpi data={data.kpis.montoTotalVendido} />
            <TicketPromedioKpi data={data.kpis.ticketPromedio} />
          </section>

          <section className="report-explorer">
            <div className="section-title-row">
              <h2>
                <span className="material-symbols-outlined" aria-hidden="true">
                  explore
                </span>
                Explorar Reportes Especializados
              </h2>
              <span>5 areas analiticas consolidadas</span>
            </div>
            <div className="module-grid">
              {data.modules.map((module) => (
                <ModuleAccessCard key={module.name} module={module} />
              ))}
            </div>
          </section>

          <VentasPorMesChart data={data.monthlySales} />

          <section className="charts-two-columns">
            <TopClientesChart data={data.topClients} />
            <TopProductosChart data={data.topProducts} />
          </section>

          <section className="charts-three-columns">
            <ComprasPorCategoriaChart data={data.categoryShare} />
            <TarjetasPorMarcaChart data={data.cardBrands} />
            <CreditoDebitoChart data={data.paymentTypes} />
          </section>
        </div>
      ) : (
        <StatePanel type={viewMode} onReset={handleResetFilters} />
      )}
    </div>
  );
}

export default DashboardPage;
