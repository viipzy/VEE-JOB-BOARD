import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Bookmark,
  FileText,
  Settings,
  LogOut,
  Briefcase,
  Home,
} from "lucide-react";

const Sidebar = ({ role = "candidate" }) => {
  // Define navigational links based on user type, now including a universal Home node
  const links =
    role === "candidate"
      ? [
          { name: "Home", path: "/", icon: Home },
          {
            name: "Overview",
            path: "/candidate/dashboard",
            icon: LayoutDashboard,
          },
          { name: "Saved Jobs", path: "/candidate/saved", icon: Bookmark },
          {
            name: "Applications",
            path: "/candidate/applications",
            icon: FileText,
          },
          {
            name: "Profile Settings",
            path: "/candidate/settings",
            icon: Settings,
          },
        ]
      : [
          { name: "Home", path: "/", icon: Home },
          {
            name: "Overview",
            path: "/employer/dashboard",
            icon: LayoutDashboard,
          },
          { name: "Manage Jobs", path: "/employer/jobs", icon: Briefcase },
          { name: "Applicants", path: "/employer/applicants", icon: FileText },
          {
            name: "Company Profile",
            path: "/employer/settings",
            icon: Settings,
          },
        ];

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-header">
        <Link to="/" className="brand-logo">
          <div className="brand-icon">V</div>
          <span>Vee.</span>
        </Link>
      </div>

      <nav className="sidebar-nav">
        <div
          style={{
            fontSize: "0.75rem",
            fontWeight: "700",
            color: "#94a3b8",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "1rem",
            paddingLeft: "1rem",
          }}
        >
          Menu
        </div>

        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive && link.path !== "/" ? "nav-item active" : "nav-item"
              }
            >
              <Icon size={18} />
              {link.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button
          className="nav-item"
          style={{
            width: "100%",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            color: "#ef4444",
          }}
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
