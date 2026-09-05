import { useMemo, useState } from "react";
import CreditoVsDebito from "../components/CreditoVsDebito";
import MarcaMasUtilizada from "../components/MarcaMasUtilizada";
import TarjetasPorMarca from "../components/TarjetasPorMarca";
import TarjetasTable from "../components/TarjetasTable";
import TopClientesPorTipoTarjeta from "../components/TopClientesPorTipoTarjeta";
import { getTarjetasData } from "../services/tarjetasService";
import "../styles/tarjetas.css";

const viewModes = [
  ["normal", "Datos disponibles"],
  ["loading", "Loading"],
  ["empty", "Sin informacion"],
  ["error", "Error"],
];

function TarjetasKpiCard({ kpi }) {
  return (
    <article className={kpi.highlighted ? "tarjetas-kpi-card is-highlighted" : "tarjetas-kpi-card"}>
      <div>
        <div className="tarjetas-kpi-top">
          <span>{kpi.label}</span>
          {kpi.highlighted ? (
            <b>Lider</b>
          ) : (
            <span className="material-symbols-outlined" aria-hidden="true">{kpi.icon}</span>
          )}
        </div>
        <strong>{kpi.value}</strong>
      </div>
      <div className="tarjetas-kpi-footer">
        <b>{kpi.trend}</b>
        <span>{kpi.detail}</span>
      </div>
    </article>
  );
}

function TarjetasFilters({ filters, onApply, onReset }) {
  return (
    <form className="tarjetas-filter-panel" onSubmit={onApply}>
      <div className="tarjetas-filter-grid">
        <label>
          <span>Periodo fiscal</span>
          <div>
            <span className="material-symbols-outlined" aria-hidden="true">calendar_month</span>
            <select defaultValue={filters.fechas[0]}>
              {filters.fechas.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
        </label>
        <label>
          <span>Cliente</span>
          <div>
            <span className="material-symbols-outlined" aria-hidden="true">group</span>
            <select defaultValue={filters.clientes[0]}>
              {filters.clientes.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
        </label>
        <label>
          <span>Marca emisora</span>
          <div>
            <span className="material-symbols-outlined" aria-hidden="true">domain</span>
            <select defaultValue={filters.marcas[0]}>
              {filters.marcas.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
        </label>
        <label>
          <span>Tipo de plastico</span>
          <div>
            <span className="material-symbols-outlined" aria-hidden="true">credit_card_clock</span>
            <select defaultValue={filters.tipos[0]}>
              {filters.tipos.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
        </label>
      </div>
      <div className="tarjetas-filter-actions">
        <button type="button" onClick={onReset}>
          <span className="material-symbols-outlined" aria-hidden="true">restart_alt</span>
          Restablecer
        </button>
        <button className="primary" type="submit">
          <span className="material-symbols-outlined" aria-hidden="true">filter_list</span>
          Aplicar
        </button>
      </div>
    </form>
  );
}

function TarjetasStatePanel({ type, onReset }) {
  const content = {
    loading: ["hourglass_top", "Cargando tarjetas", "Preparando KPIs, graficas y tabla de medios de pago."],
    empty: ["folder_off", "Sin informacion para los filtros", "No hay tarjetas disponibles para la fecha, cliente, marca o tipo seleccionado."],
    error: ["sync_problem", "Error al sincronizar tarjetas", "No fue posible consultar los datos temporales del modulo. Reintenta la consulta."],
  }[type];

  return (
    <section className={`tarjetas-state-panel ${type}`}>
      <span className="material-symbols-outlined" aria-hidden="true">{content[0]}</span>
      <h2>{content[1]}</h2>
      <p>{content[2]}</p>
      <button type="button" onClick={onReset}>Restablecer vista</button>
    </section>
  );
}

function TarjetasPage({ onBackToDashboard }) {
  const data = useMemo(() => getTarjetasData(), []);
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
    <div className="tarjetas-page">
      <div className="tarjetas-topbar">
        <nav aria-label="Ruta actual">
          <button type="button" onClick={onBackToDashboard}>Dashboard</button>
          <span className="material-symbols-outlined" aria-hidden="true">chevron_right</span>
          <strong>Tarjetas</strong>
        </nav>
        <div>
          <span>{data.gateway.cut}</span>
          <i aria-hidden="true" />
          <button type="button">
            <span className="material-symbols-outlined" aria-hidden="true">tune</span>
            Ajustar modelado
          </button>
        </div>
      </div>

      <header className="tarjetas-heading">
        <div>
          <div className="tarjetas-title-row">
            <h1>Tarjetas / Analisis</h1>
            <span>Consolidado GT</span>
          </div>
          <p>Comportamiento de medios de pago electronicos, distribucion de marcas emisoras y habitos de financiamiento.</p>
        </div>
        <div className="tarjetas-gateway-card">
          <span className="material-symbols-outlined" aria-hidden="true">contactless</span>
          <div>
            <small>{data.gateway.provider}</small>
            <strong>{data.gateway.uptime}</strong>
          </div>
        </div>
      </header>

      <TarjetasFilters filters={data.filters} onApply={handleApplyFilters} onReset={handleResetFilters} />

      <div className="tarjetas-view-switcher" aria-label="Seleccionar estado visual de tarjetas">
        {viewModes.map(([mode, label]) => (
          <button className={viewMode === mode ? "is-active" : ""} key={mode} onClick={() => setViewMode(mode)} type="button">
            {label}
          </button>
        ))}
      </div>

      {viewMode === "normal" ? (
        <>
          <section className="tarjetas-kpi-grid">
            {data.kpis.map((kpi) => <TarjetasKpiCard key={kpi.label} kpi={kpi} />)}
          </section>

          <section className="tarjetas-main-grid">
            <CreditoVsDebito data={data.creditDebit} />
            <TarjetasPorMarca data={data.byBrand} />
          </section>

          <section className="tarjetas-secondary-grid">
            <MarcaMasUtilizada data={data.mostUsedBrand} />
            <TopClientesPorTipoTarjeta clients={data.topClients} />
          </section>

          <section className="tarjetas-mosaic">
            <article>
              <span>Protocolo POS 3D Secure</span>
              <strong>Cifrado Bancario</strong>
              <p>Certificacion PCI-DSS Nivel 1 activa.</p>
            </article>
            <article>
              <span>Tasa Retencion</span>
              <strong>87.4% Recurrencia</strong>
              <p>Clientes repiten pago con tarjeta guardada.</p>
            </article>
            <article>
              <span>Conciliacion BAC</span>
              <strong>100% Emparejado</strong>
              <p>Sin disputas de contracargo abiertas hoy.</p>
            </article>
          </section>

          <TarjetasTable rows={data.tableRows} simpleRows={data.tableSimple} />

          <section className="tarjetas-fraud-callout">
            <span className="material-symbols-outlined" aria-hidden="true">verified_user</span>
            <div>
              <strong>Monitoreo de Prevencion de Fraude Antifraude v4.2</strong>
              <p>Tasa global de chargebacks en 0.02% dentro del umbral de seguridad Visa/Mastercard.</p>
            </div>
            <button type="button">Auditoria completa</button>
          </section>
        </>
      ) : (
        <TarjetasStatePanel type={viewMode} onReset={handleResetFilters} />
      )}
    </div>
  );
}

export default TarjetasPage;
