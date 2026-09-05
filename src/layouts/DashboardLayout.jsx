import Header from "./Header";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";

function DashboardLayout({ activePage = "dashboard", children, onNavigate }) {
  return (
    <div className="dashboard-shell">
      <Sidebar activePage={activePage} onNavigate={onNavigate} />
      <div className="dashboard-workspace">
        <Header />
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
}

export default DashboardLayout;
