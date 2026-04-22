import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div
      className="app-container"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {/* 1. The Global Header */}
      <Header />

      {/* 2. The Dynamic Page Content */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* 3. The Global Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
