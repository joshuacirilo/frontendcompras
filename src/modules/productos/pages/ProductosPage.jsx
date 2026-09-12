import { useCallback, useState } from "react";
import FilterBar from "../../../components/filters/FilterBar";
import EmptyBlock from "../../../components/ui/EmptyBlock";
import ApiStatusDot from "../../../components/ui/ApiStatusDot";
import { EMPTY_FILTERS } from "../../../config/apiContract";
import { useData } from "../../../hooks/useData";
import ProductosMayoresIngresos from "../components/ProductosMayoresIngresos";
import ProductosNuncaComprados from "../components/ProductosNuncaComprados";
import TopProductosMasVendidos from "../components/TopProductosMasVendidos";
import { getProductosData } from "../services/productosService";
import "../../dashboard/styles/dashboard.css";

function ProductosPage({ onBackToDashboard }) {
  const [draftFilters, setDraftFilters] = useState(EMPTY_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(EMPTY_FILTERS);

  const loader = useCallback((params) => getProductosData(params), []);
  const { data, error, isLoading, refetch } = useData(loader, { params: appliedFilters });

  return (
    <div className="productos-page">
      <header className="productos-heading">
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
          <strong>Productos</strong>
        </nav>
        <div className="productos-title-block">
          <h1>
            Productos
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

      {isLoading && !data ? <EmptyBlock title="Cargando productos" message="Consultando endpoints..." /> : null}
      {error && !data ? <EmptyBlock title="Error al cargar productos" message={error.message} /> : null}

      {data ? (
        <div className="productos-analytics-grid">
          <TopProductosMasVendidos data={data.topSold} />
          <ProductosNuncaComprados products={data.neverPurchased} />
          <ProductosMayoresIngresos data={data.topRevenue} />
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

export default ProductosPage;
