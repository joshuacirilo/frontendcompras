import { useCallback, useState } from "react";
import FilterBar from "../../../components/filters/FilterBar";
import EmptyBlock from "../../../components/ui/EmptyBlock";
import ApiStatusDot from "../../../components/ui/ApiStatusDot";
import { EMPTY_FILTERS } from "../../../config/apiContract";
import { useData } from "../../../hooks/useData";
import ClientesConComprasKpi from "../components/ClientesConComprasKpi";
import ComprasPorCategoriaChart from "../components/ComprasPorCategoriaChart";
import CreditoDebitoChart from "../components/CreditoDebitoChart";
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

function DashboardPage() {
  const [draftFilters, setDraftFilters] = useState(EMPTY_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(EMPTY_FILTERS);

  const loadDashboard = useCallback((params) => getDashboardData(params), []);
  const { data, error, isLoading, refetch } = useData(loadDashboard, {
    params: appliedFilters,
  });

  function handleApply() {
    setAppliedFilters({ ...draftFilters });
  }

  function handleReset() {
    setDraftFilters(EMPTY_FILTERS);
    setAppliedFilters(EMPTY_FILTERS);
  }

  if (isLoading && !data) {
    return <StatePanel type="loading" />;
  }

  if (error && !data) {
    return <StatePanel type="error" message={error.message} onReset={() => refetch(appliedFilters)} />;
  }

  if (!data) {
    return <StatePanel type="empty" onReset={() => refetch(appliedFilters)} />;
  }

  return (
    <div className="dashboard-page">
      <section className="page-heading">
        <div>
          <div className="eyebrow-row">
            <span>Dashboard</span>
            <i aria-hidden="true" />
            <span>Chart.js · FastAPI Azure</span>
          </div>
          <h1>
            Dashboard General
            <ApiStatusDot offline={Boolean(data.usingMock)} />
          </h1>
        </div>
      </section>

      <FilterBar
        value={draftFilters}
        onChange={setDraftFilters}
        onApply={handleApply}
        onReset={handleReset}
      />

      <section className="kpi-grid">
        <TotalComprasKpi data={data.kpis.totalCompras} />
        <ClientesConComprasKpi data={data.kpis.clientesConCompras} />
        <MontoTotalVendidoKpi data={data.kpis.montoTotalVendido} />
        <TicketPromedioKpi data={data.kpis.ticketPromedio} />
      </section>

      <div className="dashboard-content">
        {data.monthlySales.values.length ? (
          <VentasPorMesChart data={data.monthlySales} />
        ) : (
          <EmptyBlock title="Ventas por mes" message="Sin registros." />
        )}

        <div className="charts-two-columns">
          {data.topClients.length ? (
            <TopClientesChart data={data.topClients} />
          ) : (
            <EmptyBlock title="Top 10 clientes" message="Sin registros." />
          )}
          {data.topProducts.length ? (
            <TopProductosChart data={data.topProducts} />
          ) : (
            <EmptyBlock title="Top 10 productos" message="Sin registros." />
          )}
        </div>

        <div className="charts-three-columns">
          {data.categoryShare.length ? (
            <ComprasPorCategoriaChart data={data.categoryShare} />
          ) : (
            <EmptyBlock title="Compras por categoria" message="Sin registros." />
          )}
          {data.cardBrands.length ? (
            <TarjetasPorMarcaChart data={data.cardBrands} />
          ) : (
            <EmptyBlock title="Tarjetas por marca" message="Sin registros." />
          )}
          {data.paymentTypes.length ? (
            <CreditoDebitoChart data={data.paymentTypes} />
          ) : (
            <EmptyBlock title="Credito vs Debito" message="Sin registros." />
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
