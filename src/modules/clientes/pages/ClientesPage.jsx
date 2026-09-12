import { useCallback, useState } from "react";
import FilterBar from "../../../components/filters/FilterBar";
import EmptyBlock from "../../../components/ui/EmptyBlock";
import ApiStatusDot from "../../../components/ui/ApiStatusDot";
import { EMPTY_FILTERS } from "../../../config/apiContract";
import { useData } from "../../../hooks/useData";
import ClientesPorGenero from "../components/ClientesPorGenero";
import ClientesSinCompras from "../components/ClientesSinCompras";
import TopClientesPorCompras from "../components/TopClientesPorCompras";
import TopClientesPorMonto from "../components/TopClientesPorMonto";
import { getClientesData } from "../services/clientesService";
import "../../dashboard/styles/dashboard.css";

function ClientesPage({ onBackToDashboard }) {
  const [draftFilters, setDraftFilters] = useState(EMPTY_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(EMPTY_FILTERS);

  const loader = useCallback((params) => getClientesData(params), []);
  const { data, error, isLoading, refetch } = useData(loader, { params: appliedFilters });

  return (
    <div className="clientes-page">
      <header className="clientes-heading">
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
          <strong>Clientes</strong>
        </nav>
        <div className="clientes-title-block">
          <div>
            <h1>
              Clientes
              <ApiStatusDot offline={Boolean(data?.usingMock)} />
            </h1>
          </div>
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

      {isLoading && !data ? (
        <EmptyBlock title="Cargando clientes" message="Consultando endpoints de clientes..." />
      ) : null}
      {error && !data ? <EmptyBlock title="Error al cargar clientes" message={error.message} /> : null}

      {data ? (
        <div className="clientes-analytics-grid">
          <TopClientesPorMonto data={data.topByAmount} />
          <TopClientesPorCompras data={data.topByPurchases} />
          <ClientesSinCompras clients={data.inactiveClients} />
          <ClientesPorGenero data={data.genderShare} />
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

export default ClientesPage;
