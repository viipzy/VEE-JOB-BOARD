import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Bell, User } from "lucide-react";

const DashboardLayout = ({ role = "candidate" }) => {
  return (
    <div className="dashboard-wrapper">
      {/* Persistent Navigation */}
      <Sidebar role={role} />

      {/* Main Workspace */}
      <div className="dashboard-main">
        {/* Workspace Topbar */}
        <header className="dashboard-topbar">
          <h2
            style={{ fontSize: "1.25rem", fontWeight: "700", color: "#0f172a" }}
          >
            {role === "candidate" ? "Candidate Portal" : "Employer Portal"}
          </h2>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <button
              style={{
                background: "none",
                color: "#64748b",
                cursor: "pointer",
              }}
            >
              <Bell size={20} />
            </button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "#e2e8f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <User size={18} color="#64748b" />
              </div>
              <span
                style={{
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  color: "#0f172a",
                }}
              >
                User Account
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Content Injection Point */}
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
