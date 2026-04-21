import { Outlet } from "react-router-dom";
import Header from "./Header";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background font-sans text-slate-900 flex flex-col">
      <Header />
      {/* The Outlet is where the current page content gets injected */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
