import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ allowedRole }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Security Check 1: Is the user logged in?
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Security Check 2: Does the user have the right role for this dashboard?
  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <div className="flex flex-1 max-w-[1600px] w-full mx-auto">
        {/* The persistent side navigation */}
        <Sidebar />

        {/* The dynamic workspace area */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
