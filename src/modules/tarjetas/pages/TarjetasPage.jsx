import { useEffect, useState } from "react";
import { ApiResultList } from "../../../components/ui/ApiResultViews";
import {
  getMarcas,
  getTarjetas,
  getTarjetasCreditoVsDebito,
  getTarjetasMasUtilizadas,
  getTarjetasPorMarca,
} from "../services/tarjetasService";
import "../../dashboard/styles/dashboard.css";
import "../styles/tarjetas.css";

const listEndpoints = [
  { id: "tarjetas", title: "Tarjetas", load: () => getTarjetas({ limit: 10, offset: 0 }) },
  {
    id: "tarjetas-mas-utilizadas",
    title: "Tarjetas mas utilizadas",
    load: () => getTarjetasMasUtilizadas({ limit: 10 }),
  },
  {
    id: "tarjetas-credito-debito",
    title: "Credito vs debito",
    load: getTarjetasCreditoVsDebito,
  },
  { id: "marcas", title: "Marcas", load: () => getMarcas({ limit: 10, offset: 0 }) },
  { id: "tarjetas-por-marca", title: "Tarjetas por marca", load: getTarjetasPorMarca },
];

function buildInitialState() {
  return listEndpoints.map((item) => ({ ...item, payload: null, status: "loading" }));
}

async function loadItem(item) {
  try {
    return { ...item, payload: await item.load(), status: "available" };
  } catch (error) {
    return { ...item, error: error.message, payload: null, status: "error" };
  }
}

function TarjetasPage({ onBackToDashboard }) {
  const [lists, setLists] = useState(buildInitialState);

  async function loadTarjetas() {
    setLists(buildInitialState());
    setLists(await Promise.all(listEndpoints.map(loadItem)));
  }

  useEffect(() => {
    loadTarjetas();
  }, []);

  return (
    <div className="tarjetas-page">
      <div className="tarjetas-topbar">
        <nav aria-label="Ruta actual">
          <button type="button" onClick={onBackToDashboard}>Dashboard</button>
          <span className="material-symbols-outlined" aria-hidden="true">chevron_right</span>
          <strong>Tarjetas</strong>
        </nav>
      </div>

      <header className="tarjetas-heading">
        <div>
          <div className="tarjetas-title-row">
            <h1>Tarjetas</h1>
          </div>
        </div>
      </header>

      <section className="api-list-grid">
        {lists.map((item) => (
          <ApiResultList item={item} key={item.id} />
        ))}
      </section>
    </div>
  );
}

export default TarjetasPage;
