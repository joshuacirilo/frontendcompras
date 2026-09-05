import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./modules/dashboard/pages/DashboardPage";
import ClientesPage from "./modules/clientes/pages/ClientesPage";
import ComprasPage from "./modules/compras/pages/ComprasPage";
import ProductosPage from "./modules/productos/pages/ProductosPage";
import { useState } from "react";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <DashboardLayout activePage={activePage} onNavigate={setActivePage}>
      {activePage === "clientes" ? (
        <ClientesPage onBackToDashboard={() => setActivePage("dashboard")} />
      ) : activePage === "compras" ? (
        <ComprasPage onBackToDashboard={() => setActivePage("dashboard")} />
      ) : activePage === "productos" ? (
        <ProductosPage onBackToDashboard={() => setActivePage("dashboard")} />
      ) : (
        <DashboardPage />
      )}
    </DashboardLayout>
  );
}

export default App;
