import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./modules/dashboard/pages/DashboardPage";
import ComprasPage from "./modules/compras/pages/ComprasPage";
import { useState } from "react";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <DashboardLayout activePage={activePage} onNavigate={setActivePage}>
      {activePage === "compras" ? (
        <ComprasPage onBackToDashboard={() => setActivePage("dashboard")} />
      ) : (
        <DashboardPage />
      )}
    </DashboardLayout>
  );
}

export default App;
