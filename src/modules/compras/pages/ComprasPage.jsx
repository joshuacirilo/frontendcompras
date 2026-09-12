import { useCallback, useState } from "react";
import FilterBar from "../../../components/filters/FilterBar";
import EmptyBlock from "../../../components/ui/EmptyBlock";
import ApiStatusDot from "../../../components/ui/ApiStatusDot";
import { EMPTY_FILTERS } from "../../../config/apiContract";
import { useData } from "../../../hooks/useData";
import MesMayorFacturacion from "../components/MesMayorFacturacion";
import TicketPromedio from "../components/TicketPromedio";
import VentasPorAnio from "../components/VentasPorAnio";
import VentasPorMes from "../components/VentasPorMes";
import { getComprasData } from "../services/comprasService";
import "../../dashboard/styles/dashboard.css";

function ComprasPage({ onBackToDashboard }) {
  const [draftFilters, setDraftFilters] = useState(EMPTY_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(EMPTY_FILTERS);

  const loader = useCallback((params) => getComprasData(params), []);
  const { data, error, isLoading, refetch } = useData(loader, { params: appliedFilters });

  return (
    <div className="compras-page">
      <header className="compras-heading">
        <nav aria-label="Ruta actual">
          <button type="button" onClick={onBackToDashboard}>
            <span className="material-symbols-outlined" aria-hidden="true">
              dashboard
            </span>
            Dashboard
          </button>
          <span className="material-symbols-outlined" aria-hidden="true">
            chevron_right
          </span>
          <strong>Compras</strong>
        </nav>
        <div className="compras-title-block">
          <h1>
            Compras
            <ApiStatusDot offline={Boolean(data?.usingMock)} />
          </h1>
        </div>
      </header>

      <FilterBar
        value={draftFilters}
        onChange={setDraftFilters}
        onApply={() => setAppliedFilters({ ...draftFilters })}
        onReset={() => {
          setDraftFilters(EMPTY_FILTERS);
          setAppliedFilters(EMPTY_FILTERS);
        }}
      />

      {isLoading && !data ? <EmptyBlock title="Cargando compras" message="Consultando endpoints..." /> : null}
      {error && !data ? <EmptyBlock title="Error al cargar compras" message={error.message} /> : null}

      {data ? (
        <>
          <VentasPorMes data={data.monthlySales} />
          <div className="compras-analytics-grid">
            <VentasPorAnio data={data.yearlySales} />
            <MesMayorFacturacion peakMonth={data.peakMonth} />
          </div>
          <TicketPromedio summary={data.ticketAverageSummary} />
        </>
      ) : null}

      {data && !isLoading ? (
        <button className="ghost-button" type="button" onClick={() => refetch(appliedFilters)}>
          Reintentar
        </button>
      ) : null}
    </div>
  );
}

export default ComprasPage;
