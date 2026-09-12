import { useCallback, useState } from "react";
import FilterBar from "../../../components/filters/FilterBar";
import EmptyBlock from "../../../components/ui/EmptyBlock";
import ApiStatusDot from "../../../components/ui/ApiStatusDot";
import { EMPTY_FILTERS } from "../../../config/apiContract";
import { useData } from "../../../hooks/useData";
import CategoriaMasConsumida from "../components/CategoriaMasConsumida";
import CategoriaMenosConsumida from "../components/CategoriaMenosConsumida";
import ParticipacionPorCategoria from "../components/ParticipacionPorCategoria";
import { getCategoriasData } from "../services/categoriasService";
import "../../dashboard/styles/dashboard.css";
import "../styles/categorias.css";

function CategoriasPage({ onBackToDashboard }) {
  const [draftFilters, setDraftFilters] = useState(EMPTY_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(EMPTY_FILTERS);

  const loader = useCallback(() => getCategoriasData(), []);
  const { data, error, isLoading, refetch } = useData(loader, { params: appliedFilters });

  return (
    <div className="categorias-page">
      <header className="categorias-heading">
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
          <strong>Categorias</strong>
        </nav>
        <div className="categorias-title-block">
          <h1>
            Categorias
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

      {isLoading && !data ? <EmptyBlock title="Cargando categorias" message="Consultando API..." /> : null}
      {error && !data ? <EmptyBlock title="Error al cargar categorias" message={error.message} /> : null}

      {data ? (
        <div className="categorias-analytics-grid">
          {data.mostConsumed ? <CategoriaMasConsumida category={data.mostConsumed} /> : null}
          {data.leastConsumed ? <CategoriaMenosConsumida category={data.leastConsumed} /> : null}
          {data.participation.length ? <ParticipacionPorCategoria data={data.participation} /> : null}
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

export default CategoriasPage;
