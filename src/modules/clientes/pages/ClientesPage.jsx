import { useEffect, useState } from "react";
import { ApiResultList, ApiSummaryCard } from "../../../components/ui/ApiResultViews";
import {
  getClienteMayorConsumo,
  getClientes,
  getClientesSinCompras,
  getTopClientes,
} from "../services/clientesService";

const cardEndpoints = [
  { id: "clientes", title: "Clientes", icon: "groups", load: () => getClientes({ limit: 10, offset: 0 }) },
  {
    id: "clientes-sin-compras",
    title: "Clientes sin compras",
    icon: "person_off",
    load: () => getClientesSinCompras({ limit: 10 }),
  },
  {
    id: "cliente-mayor-consumo",
    title: "Cliente mayor consumo",
    icon: "leaderboard",
    load: getClienteMayorConsumo,
  },
];

const listEndpoints = [
  {
    id: "clientes-top10",
    title: "Clientes top 10",
    load: () => getTopClientes({ limit: 10 }),
  },
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

function ClientesPage({ onBackToDashboard }) {
  const [cards, setCards] = useState(() => buildInitialState(cardEndpoints));
  const [lists, setLists] = useState(() => buildInitialState(listEndpoints));

  async function loadClientes() {
    setCards(buildInitialState(cardEndpoints));
    setLists(buildInitialState(listEndpoints));
    setCards(await Promise.all(cardEndpoints.map(loadItem)));
    setLists(await Promise.all(listEndpoints.map(loadItem)));
  }

  useEffect(() => {
    loadClientes();
  }, []);

  return (
    <div className="clientes-page">
      <header className="clientes-heading">
        <nav aria-label="Ruta actual">
          <button type="button" onClick={onBackToDashboard}>
            <span className="material-symbols-outlined" aria-hidden="true">dashboard</span>
            Dashboard
          </button>
          <span className="material-symbols-outlined" aria-hidden="true">chevron_right</span>
          <strong>Clientes</strong>
        </nav>
        <div className="clientes-title-block">
          <div>
            <h1>Clientes</h1>
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

export default ClientesPage;
