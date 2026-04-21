import { Briefcase, Bookmark, FileText, ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";

const DashboardOverview = () => {
  // Retrieve user data from Redux, provide fallback for development
  const authState = useSelector((state) => state.auth) || { user: null };
  const userName = authState.user?.name || "James";

  return (
    <div>
      {/* Welcome Header */}
      <div className="dashboard-welcome">
        <div className="welcome-text">
          <h1>Welcome back, {userName}! 👋</h1>
          <p>Here is what is happening with your job search today.</p>
        </div>
        <button className="btn-primary">Update Profile</button>
      </div>

      {/* Control Panel: Metric Cards */}
      <div className="dashboard-stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Briefcase size={24} />
          </div>
          <div className="stat-details">
            <div className="stat-value">12</div>
            <div className="stat-label">Applied Jobs</div>
          </div>
        </div>

        <div className="stat-card">
          <div
            className="stat-icon"
            style={{ backgroundColor: "#fef2f2", color: "#dc2626" }}
          >
            <Bookmark size={24} />
          </div>
          <div className="stat-details">
            <div className="stat-value">24</div>
            <div className="stat-label">Saved Jobs</div>
          </div>
        </div>

        <div className="stat-card">
          <div
            className="stat-icon"
            style={{ backgroundColor: "#ecfdf5", color: "#059669" }}
          >
            <FileText size={24} />
          </div>
          <div className="stat-details">
            <div className="stat-value">85%</div>
            <div className="stat-label">Profile Strength</div>
          </div>
        </div>
      </div>

      {/* Data Table: Recent Applications */}
      <div className="dashboard-section">
        <div className="section-header-row">
          <h3>Recent Applications</h3>
          <a
            href="#"
            style={{
              fontSize: "0.85rem",
              fontWeight: "600",
              color: "#2563eb",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            View All <ArrowRight size={14} />
          </a>
        </div>

        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Company</th>
                <th>Date Applied</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: "600" }}>Senior React Developer</td>
                <td>Stripe</td>
                <td style={{ color: "#64748b" }}>Oct 24, 2026</td>
                <td>
                  <span className="status-badge status-review">In Review</span>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: "600" }}>Product Designer</td>
                <td>Figma</td>
                <td style={{ color: "#64748b" }}>Oct 20, 2026</td>
                <td>
                  <span className="status-badge status-interview">
                    Interview
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
