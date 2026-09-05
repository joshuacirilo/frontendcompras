import { useEffect, useState } from "react";
import { ApiResultList } from "../../../components/ui/ApiResultViews";
import { getCategorias } from "../services/categoriasService";
import "../../dashboard/styles/dashboard.css";
import "../styles/categorias.css";

const listEndpoints = [
  { id: "categorias", title: "Categorias", load: () => getCategorias({ limit: 10, offset: 0 }) },
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

function CategoriasPage({ onBackToDashboard }) {
  const [lists, setLists] = useState(buildInitialState);

  async function loadCategorias() {
    setLists(buildInitialState());
    setLists(await Promise.all(listEndpoints.map(loadItem)));
  }

  useEffect(() => {
    loadCategorias();
  }, []);

  return (
    <div className="categorias-page">
      <header className="categorias-heading">
        <div>
          <nav aria-label="Ruta actual">
            <button type="button" onClick={onBackToDashboard}>
              <span className="material-symbols-outlined" aria-hidden="true">dashboard</span>
              Dashboard
            </button>
            <span className="material-symbols-outlined" aria-hidden="true">chevron_right</span>
            <strong>Categorias</strong>
          </nav>
          <div className="categorias-title-row">
            <h1>Categorias</h1>
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

export default CategoriasPage;
