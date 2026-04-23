import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Bookmark,
  FileText,
  Users,
  Eye,
  TrendingUp,
} from "lucide-react";

const DashboardOverview = () => {
  // Read the user's role from the Redux brain
  const { user } = useSelector((state) => state.auth);

  // Initialize the navigation hook
  const navigate = useNavigate();

  // --- EMPLOYER UI RENDERING ---
  if (user?.role === "employer") {
    return (
      <div className="fade-in-animation">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "1.875rem",
                fontWeight: "800",
                color: "#0f172a",
                marginBottom: "0.5rem",
              }}
            >
              Welcome back, {user?.name}! 👋
            </h1>
            <p style={{ color: "#64748b", fontSize: "1rem" }}>
              Here is an overview of your hiring pipeline today.
            </p>
          </div>

          {/* THE WIRED BUTTON */}
          <button
            onClick={() => navigate("/employer/post-job")}
            className="btn-primary"
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Post New Job
          </button>
        </div>

        {/* Employer Stat Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          <StatCard
            icon={<Briefcase size={24} color="#2563eb" />}
            title="Active Jobs"
            value="4"
            bgColor="#eff6ff"
          />
          <StatCard
            icon={<Users size={24} color="#059669" />}
            title="Total Applicants"
            value="142"
            bgColor="#ecfdf5"
          />
          <StatCard
            icon={<Eye size={24} color="#7c3aed" />}
            title="Profile Views"
            value="845"
            bgColor="#f5f3ff"
          />
        </div>

        {/* Employer Table */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            padding: "1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.5rem",
            }}
          >
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: "700",
                color: "#0f172a",
              }}
            >
              Recent Applications Received
            </h3>
            <button
              style={{
                color: "#2563eb",
                background: "none",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              View All
            </button>
          </div>
          <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
            Application data will dynamically load here once connected to
            Firestore.
          </p>
        </div>
      </div>
    );
  }

  // --- CANDIDATE UI RENDERING ---
  return (
    <div className="fade-in-animation">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "1.875rem",
              fontWeight: "800",
              color: "#0f172a",
              marginBottom: "0.5rem",
            }}
          >
            Welcome back, {user?.name}! 👋
          </h1>
          <p style={{ color: "#64748b", fontSize: "1rem" }}>
            Here is what is happening with your job search today.
          </p>
        </div>
        <button
          className="btn-primary"
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            backgroundColor: "#2563eb",
          }}
        >
          Update Profile
        </button>
      </div>

      {/* Candidate Stat Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <StatCard
          icon={<Briefcase size={24} color="#2563eb" />}
          title="Applied Jobs"
          value="12"
          bgColor="#eff6ff"
        />
        <StatCard
          icon={<Bookmark size={24} color="#dc2626" />}
          title="Saved Jobs"
          value="24"
          bgColor="#fef2f2"
        />
        <StatCard
          icon={<FileText size={24} color="#059669" />}
          title="Profile Strength"
          value="85%"
          bgColor="#ecfdf5"
        />
      </div>

      {/* Candidate Table */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          padding: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <h3
            style={{ fontSize: "1.1rem", fontWeight: "700", color: "#0f172a" }}
          >
            Recent Applications
          </h3>
          <button
            style={{
              color: "#2563eb",
              background: "none",
              border: "none",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            View All Jobs →
          </button>
        </div>
        <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
          Application data will dynamically load here once connected to
          Firestore.
        </p>
      </div>
    </div>
  );
};

// Reusable Stat Card Component to keep code clean
const StatCard = ({ icon, title, value, bgColor }) => (
  <div
    style={{
      backgroundColor: "white",
      padding: "1.5rem",
      borderRadius: "12px",
      border: "1px solid #e2e8f0",
      display: "flex",
      alignItems: "center",
      gap: "1.5rem",
    }}
  >
    <div
      style={{
        width: "56px",
        height: "56px",
        borderRadius: "12px",
        backgroundColor: bgColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon}
    </div>
    <div>
      <h4
        style={{
          fontSize: "1.75rem",
          fontWeight: "800",
          color: "#0f172a",
          lineHeight: "1.2",
        }}
      >
        {value}
      </h4>
      <span style={{ fontSize: "0.9rem", color: "#64748b", fontWeight: "500" }}>
        {title}
      </span>
    </div>
  </div>
);

export default DashboardOverview;
