import { useEffect, useState } from "react";
import ComprasTable from "../components/ComprasTable";
import MesMayorFacturacion from "../components/MesMayorFacturacion";
import ResumenCompras from "../components/ResumenCompras";
import TicketPromedio from "../components/TicketPromedio";
import VentasPorAnio from "../components/VentasPorAnio";
import VentasPorMes from "../components/VentasPorMes";
import { getComprasData, getComprasMockData } from "../services/comprasService";

function ComprasPage({ onBackToDashboard }) {
  const [data, setData] = useState(() => getComprasMockData());
  const [viewMode, setViewMode] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  async function loadCompras(params) {
    setViewMode("loading");
    setErrorMessage("");

    try {
      const nextData = await getComprasData(params);
      setData(nextData);
      setViewMode(nextData.purchases.length ? "normal" : "empty");
    } catch (error) {
      setErrorMessage(error.message);
      setViewMode("error");
    }
  }

  useEffect(() => {
    loadCompras();
  }, []);

  function handleResetFilters() {
    loadCompras();
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
            <button className="primary" type="button">
              <span className="material-symbols-outlined" aria-hidden="true">receipt</span>
              Nueva Compra
            </button>
          </div>
        </div>
      </header>

      {viewMode === "normal" ? (
        <>
          <ResumenCompras kpis={data.kpis} />
          <VentasPorMes data={data.monthlySales} />
          <div className="compras-analytics-grid">
            <VentasPorAnio data={data.yearlySales} />
            <MesMayorFacturacion peakMonth={data.peakMonth} peakHours={data.peakHours} />
          </div>
          <TicketPromedio summary={data.ticketAverageSummary} />
          <ComprasTable purchases={data.purchases} total={data.kpis[0].value} />
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
                ? "Sin informacion disponible"
                : "Error al sincronizar compras"}
          </h3>
          <p>
            {viewMode === "loading"
              ? "Preparando indicadores, graficas y registro maestro de transacciones."
              : viewMode === "empty"
                ? "La API no devolvio transacciones disponibles para mostrar."
                : errorMessage || "No fue posible consultar la API de compras. Reintenta la consulta."}
          </p>
          <button type="button" onClick={handleResetFilters}>Restablecer vista</button>
        </section>
      )}
    </div>
  );
}

export default ComprasPage;
