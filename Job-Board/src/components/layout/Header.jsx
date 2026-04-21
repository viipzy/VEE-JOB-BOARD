import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Bell, MessageSquare, User, Briefcase } from "lucide-react";
// Note: Ensure your logout action matches what is exported from authSlice
// import { logout } from '../../../store/authSlice';

const Header = () => {
  // Gracefully handle undefined state during development
  const authState = useSelector((state) => state.auth) || {
    user: null,
    isAuthenticated: false,
  };
  const { user, isAuthenticated } = authState;
  const dispatch = useDispatch();

  return (
    <header className="app-header">
      <div className="header-left">
        <Link to="/" className="brand-logo">
          <div className="brand-icon">V</div>
          <span>Vee.</span>
        </Link>

        <nav style={{ display: "flex", gap: "1.5rem" }}>
          <Link to="/jobs" className="nav-link">
            Find Jobs
          </Link>
          <Link to="/companies" className="nav-link">
            Companies
          </Link>
        </nav>
      </div>

      <div className="header-right">
        {isAuthenticated ? (
          <>
            <button className="icon-btn">
              <Bell size={20} />
            </button>
            <button className="icon-btn">
              <MessageSquare size={20} />
            </button>

            <div
              style={{ width: "1px", height: "32px", background: "#e2e8f0" }}
            ></div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ textAlign: "right" }}>
                <p
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    color: "#0f172a",
                  }}
                >
                  {user.name}
                </p>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#64748b",
                    textTransform: "capitalize",
                  }}
                >
                  {user.role}
                </p>
              </div>
              <button className="icon-btn" style={{ background: "#f1f5f9" }}>
                <User size={18} />
              </button>
            </div>

            {user.role === "employer" && (
              <Link to="/employer/post-job" className="btn-primary">
                <Briefcase size={18} /> Post a Job
              </Link>
            )}
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="nav-link"
              style={{ fontWeight: "600", color: "#2563eb" }}
            >
              Log In
            </Link>
            <Link to="/register" className="btn-primary">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
