import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { logout } from "../../store/authSlice";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failure:", error);
    }
  };

  // Dynamically determine the correct routing path based on the user's security clearance
  const getDashboardLink = () => {
    return user?.role === "employer"
      ? "/employer/dashboard"
      : "/candidate/dashboard";
  };

  return (
    <nav
      className="navbar-container"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        borderBottom: "1px solid #e2e8f0",
        backgroundColor: "white",
      }}
    >
      {/* Brand Identity / Home Portal */}
      <Link
        to="/"
        style={{
          fontWeight: "800",
          fontSize: "1.5rem",
          textDecoration: "none",
          color: "#2563eb",
          letterSpacing: "-0.5px",
        }}
      >
        Vee.
      </Link>

      <div className="nav-actions">
        {isAuthenticated ? (
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            {/* 1. DIRECT DASHBOARD LINK: The Avatar is now the door */}
            <Link
              to={getDashboardLink()}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                textDecoration: "none",
                color: "#0f172a",
                transition: "opacity 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
              onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "#f1f5f9",
                  color: "#2563eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                  border: "1px solid #e2e8f0",
                }}
              >
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <span style={{ fontWeight: "600", fontSize: "0.95rem" }}>
                Dashboard
              </span>
            </Link>

            {/* 2. DEDICATED LOGOUT MECHANISM */}
            <button
              onClick={handleLogout}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.5rem 0.75rem",
                color: "#ef4444",
                backgroundColor: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.85rem",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#fee2e2")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#fef2f2")
              }
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Link
              to="/login"
              style={{
                padding: "0.5rem 1rem",
                textDecoration: "none",
                color: "#475569",
                fontWeight: "600",
                fontSize: "0.95rem",
              }}
            >
              Log In
            </Link>
            <Link
              to="/register"
              style={{
                padding: "0.6rem 1.25rem",
                textDecoration: "none",
                backgroundColor: "#2563eb",
                color: "white",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "0.95rem",
                boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.2)",
              }}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
