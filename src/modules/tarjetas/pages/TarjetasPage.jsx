import { useCallback, useState } from "react";
import FilterBar from "../../../components/filters/FilterBar";
import EmptyBlock from "../../../components/ui/EmptyBlock";
import ApiStatusDot from "../../../components/ui/ApiStatusDot";
import { EMPTY_FILTERS } from "../../../config/apiContract";
import { useData } from "../../../hooks/useData";
import CreditoVsDebito from "../components/CreditoVsDebito";
import MarcaMasUtilizada from "../components/MarcaMasUtilizada";
import TopClientesPorTipoTarjeta from "../components/TopClientesPorTipoTarjeta";
import { getTarjetasData } from "../services/tarjetasService";
import "../../dashboard/styles/dashboard.css";
import "../styles/tarjetas.css";

function TarjetasPage({ onBackToDashboard }) {
  const [draftFilters, setDraftFilters] = useState(EMPTY_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(EMPTY_FILTERS);

  const loader = useCallback(() => getTarjetasData(), []);
  const { data, error, isLoading, refetch } = useData(loader, { params: appliedFilters });

  return (
    <div className="tarjetas-page">
      <header className="tarjetas-heading">
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
          <strong>Tarjetas</strong>
        </nav>
        <div className="tarjetas-title-block">
          <h1>
            Tarjetas
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

      {isLoading && !data ? <EmptyBlock title="Cargando tarjetas" message="Consultando endpoints..." /> : null}
      {error && !data ? <EmptyBlock title="Error al cargar tarjetas" message={error.message} /> : null}

      {data ? (
        <div className="tarjetas-analytics-grid">
          {data.mostUsedBrand ? <MarcaMasUtilizada data={data.mostUsedBrand} /> : null}
          {data.creditDebit.length ? <CreditoVsDebito data={data.creditDebit} /> : null}
          {data.topClients.length ? <TopClientesPorTipoTarjeta clients={data.topClients} /> : null}
        </div>
      ) : null}

      {data && !isLoading ? (
        <button className="ghost-button" type="button" onClick={() => refetch(appliedFilters)}>
          Reintentar
        </button>
      ) : null}
    </div>
  );
}

export default TarjetasPage;
