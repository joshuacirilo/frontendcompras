import { useEffect, useState } from "react";
import EndpointCard from "../components/EndpointCard";
import StatePanel from "../components/StatePanel";
import { dashboardEndpointCards, getDashboardEndpointCards } from "../services/dashboardEndpoints";
import "../styles/dashboard.css";

function DashboardPage() {
  const [cards, setCards] = useState(() =>
    dashboardEndpointCards.map((card) => ({
      ...card,
      count: "-",
      detail: "Consulta pendiente",
      sample: "Esperando respuesta del endpoint",
      status: "loading",
    })),
  );
  const [viewMode, setViewMode] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  async function loadDashboard() {
    setViewMode("loading");
    setErrorMessage("");
    setCards((currentCards) =>
      currentCards.map((card) => ({
        ...card,
        count: "-",
        detail: "Consulta pendiente",
        sample: "Esperando respuesta del endpoint",
        status: "loading",
      })),
    );

    try {
      const nextCards = await getDashboardEndpointCards();
      setCards(nextCards);
      setViewMode(nextCards.some((card) => card.status === "available") ? "normal" : "empty");
    } catch (error) {
      setErrorMessage(error.message);
      setViewMode("error");
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  function handleResetFilters() {
    loadDashboard();
  }

  return (
    <div className="dashboard-page">
      <section className="page-heading">
        <div>
          <div className="eyebrow-row">
            <span>Endpoints API</span>
            <i aria-hidden="true" />
            <span>Datos verificados por respuesta</span>
          </div>
          <h1>Dashboard General</h1>
        </div>
      </section>

      {viewMode === "normal" || viewMode === "empty" ? (
        <div className="dashboard-content">
          <section className="endpoint-board">
            <div className="section-title-row">
              <h2>
                <span className="material-symbols-outlined" aria-hidden="true">
                  api
                </span>
                Resumen general
              </h2>
              <span>{cards.length} consultas</span>
            </div>
            <div className="endpoint-grid">
              {cards.map((card) => (
                <EndpointCard key={card.id} card={card} />
              ))}
            </div>
          </section>
        </div>
      ) : (
        <StatePanel type={viewMode} message={errorMessage} onReset={handleResetFilters} />
      )}
    </div>
  );
}

export default DashboardPage;
