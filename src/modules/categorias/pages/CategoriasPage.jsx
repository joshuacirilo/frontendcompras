import { useMemo, useState } from "react";
import CategoriaMasConsumida from "../components/CategoriaMasConsumida";
import CategoriaMenosConsumida from "../components/CategoriaMenosConsumida";
import CategoriasFilters from "../components/CategoriasFilters";
import CategoriasKpiCard from "../components/CategoriasKpiCard";
import CategoriasStatePanel from "../components/CategoriasStatePanel";
import CategoriasTable from "../components/CategoriasTable";
import CategoriasYoYPanel from "../components/CategoriasYoYPanel";
import ParticipacionPorCategoria from "../components/ParticipacionPorCategoria";
import { getCategoriasData } from "../services/categoriasService";
import "../../dashboard/styles/dashboard.css";
import "../styles/categorias.css";

const viewModes = [
  ["normal", "Datos disponibles"],
  ["loading", "Loading"],
  ["empty", "Sin datos"],
  ["error", "Error"],
];

function CategoriasPage({ onBackToDashboard }) {
  const data = useMemo(() => getCategoriasData(), []);
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
    <div className="categorias-page">
      <header className="categorias-heading">
        <div>
          <nav aria-label="Ruta actual">
            <button type="button" onClick={onBackToDashboard}>
              <span className="material-symbols-outlined" aria-hidden="true">dashboard</span>
              Dashboard
            </button>
            <span className="material-symbols-outlined" aria-hidden="true">chevron_right</span>
            <strong>Categorias</strong>
          </nav>
          <div className="categorias-title-row">
            <h1>Categorias / Analisis</h1>
            <span>Q3 FY2024</span>
          </div>
          <p>Evaluacion de lineas comerciales, penetracion de mercado y concentracion de ventas por categoria.</p>
        </div>
        <div className="categorias-header-actions">
          <button type="button">
            <span className="material-symbols-outlined" aria-hidden="true">tune</span>
            Rebalancear Mix
          </button>
          <button className="primary" type="button">
            <span className="material-symbols-outlined" aria-hidden="true">download_for_offline</span>
            Descargar Matriz
          </button>
        </div>
      </header>

      <CategoriasFilters filters={data.filters} onApply={handleApplyFilters} onReset={handleResetFilters} />

      <div className="categorias-view-switcher" aria-label="Seleccionar estado visual de categorias">
        {viewModes.map(([mode, label]) => (
          <button className={viewMode === mode ? "is-active" : ""} key={mode} onClick={() => setViewMode(mode)} type="button">
            {label}
          </button>
        ))}
      </div>

      {viewMode === "normal" ? (
        <>
          <section className="categorias-kpi-grid">
            {data.kpis.map((kpi) => <CategoriasKpiCard key={kpi.label} kpi={kpi} />)}
          </section>
          <section className="categorias-report-grid">
            <CategoriaMasConsumida category={data.mostConsumed} />
            <CategoriaMenosConsumida category={data.leastConsumed} />
          </section>
          <section className="categorias-report-grid">
            <ParticipacionPorCategoria data={data.participation} />
            <CategoriasYoYPanel data={data.yoyPerformance} />
          </section>
          <CategoriasTable categories={data.table} total={data.kpis[0].value} />
        </>
      ) : (
        <CategoriasStatePanel type={viewMode} onReset={handleResetFilters} />
      )}
    </div>
  );
}

export default CategoriasPage;
