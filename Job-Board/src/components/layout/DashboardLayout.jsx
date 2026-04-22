import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { Bell } from "lucide-react";

const DashboardLayout = ({ role = "candidate" }) => {
  // 1. Intercept the user data from the Redux store
  const authState = useSelector((state) => state.auth) || { user: null };
  const user = authState.user;

  // 2. Establish fallback values in case of slow rendering
  const userName = user?.name || "User Account";
  const userInitial = userName.charAt(0);

  // 3. Determine the correct routing path based on the user's role
  const profilePath =
    role === "employer" ? "/employer/settings" : "/candidate/settings";

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

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              className="icon-btn"
              style={{
                background: "none",
                color: "#64748b",
                cursor: "pointer",
                padding: "0.5rem",
              }}
            >
              <Bell size={20} />
            </button>

            {/* Dynamic Interactive Profile Widget */}
            <Link to={profilePath} className="profile-pill">
              <div className="profile-avatar">{userInitial}</div>
              <span className="profile-name">{userName}</span>
            </Link>
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
