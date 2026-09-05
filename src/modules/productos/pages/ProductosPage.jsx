import { useEffect, useState } from "react";
import { ApiResultList } from "../../../components/ui/ApiResultViews";
import {
  getProductos,
  getProductosPorCategoria,
  getProductosSinVentas,
  getTopProductos,
} from "../services/productosService";
import "../../dashboard/styles/dashboard.css";

const listEndpoints = [
  { id: "productos", title: "Productos", load: () => getProductos({ limit: 10, offset: 0 }) },
  { id: "productos-top10", title: "Productos top 10", load: () => getTopProductos({ limit: 10 }) },
  {
    id: "productos-sin-ventas",
    title: "Productos sin ventas",
    load: () => getProductosSinVentas({ limit: 10 }),
  },
  { id: "productos-por-categoria", title: "Productos por categoria", load: getProductosPorCategoria },
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

function ProductosPage({ onBackToDashboard }) {
  const [lists, setLists] = useState(buildInitialState);

  async function loadProductos() {
    setLists(buildInitialState());
    setLists(await Promise.all(listEndpoints.map(loadItem)));
  }

  useEffect(() => {
    loadProductos();
  }, []);

  return (
    <div className="productos-page">
      <header className="productos-heading">
        <div>
          <nav aria-label="Ruta actual">
            <button type="button" onClick={onBackToDashboard}>
              <span className="material-symbols-outlined" aria-hidden="true">dashboard</span>
              Dashboard
            </button>
            <span className="material-symbols-outlined" aria-hidden="true">chevron_right</span>
            <strong>Productos</strong>
          </nav>
          <div className="productos-title-row">
            <h1>Productos</h1>
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

export default ProductosPage;
