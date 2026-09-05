import Header from "./Header";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="dashboard-shell">
      <Sidebar />
      <div className="dashboard-workspace">
        <Header />
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
}

export default DashboardLayout;
