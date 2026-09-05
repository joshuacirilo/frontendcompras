import { useEffect, useState } from "react";
import { ApiResultList, ApiSummaryCard } from "../../../components/ui/ApiResultViews";
import {
  getCompras,
  getComprasPorAnio,
  getComprasPorMes,
  getComprasPromedio,
} from "../services/comprasService";

const cardEndpoints = [
  { id: "compras-por-anio", title: "Compras por anio", icon: "date_range", load: getComprasPorAnio },
  { id: "compras-promedio", title: "Compras promedio", icon: "receipt_long", load: getComprasPromedio },
];

const listEndpoints = [
  { id: "compras", title: "Compras", load: () => getCompras({ limit: 10, offset: 0 }) },
  { id: "compras-por-mes", title: "Compras por mes", load: getComprasPorMes },
];

function buildInitialState(items) {
  return items.map((item) => ({ ...item, payload: null, status: "loading" }));
}

async function loadItem(item) {
  try {
    return { ...item, payload: await item.load(), status: "available" };
  } catch (error) {
    return { ...item, error: error.message, payload: null, status: "error" };
  }
}

function ComprasPage({ onBackToDashboard }) {
  const [cards, setCards] = useState(() => buildInitialState(cardEndpoints));
  const [lists, setLists] = useState(() => buildInitialState(listEndpoints));

  async function loadCompras() {
    setCards(buildInitialState(cardEndpoints));
    setLists(buildInitialState(listEndpoints));
    setCards(await Promise.all(cardEndpoints.map(loadItem)));
    setLists(await Promise.all(listEndpoints.map(loadItem)));
  }

  useEffect(() => {
    loadCompras();
  }, []);

  return (
    <div className="compras-page">
      <header className="compras-heading">
        <nav aria-label="Ruta actual">
          <button type="button" onClick={onBackToDashboard}>Dashboard</button>
          <span className="material-symbols-outlined" aria-hidden="true">chevron_right</span>
          <strong>Compras</strong>
        </nav>
        <div className="compras-heading-main">
          <div>
            <div className="compras-title-row">
              <h1>Compras</h1>
            </div>
          </div>
        </div>
      </header>

      <section className="api-summary-grid">
        {cards.map((item) => (
          <ApiSummaryCard item={item} key={item.id} />
        ))}
      </section>

      <section className="api-list-grid">
        {lists.map((item) => (
          <ApiResultList item={item} key={item.id} />
        ))}
      </section>
    </div>
  );
}

export default ComprasPage;
