import {
  Search,
  MapPin,
  Users,
  Globe,
  Building2,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

// High-fidelity mock data for employer profiles
const mockCompanies = [
  {
    id: 1,
    name: "Stripe",
    logo: "S",
    industry: "Financial Services",
    location: "San Francisco, CA",
    size: "1,000-5,000",
    openJobs: 42,
    desc: "Financial infrastructure platform for the internet. Millions of companies of all sizes use Stripe to accept payments online and in person.",
  },
  {
    id: 2,
    name: "Airbnb",
    logo: "A",
    industry: "Travel & Tech",
    location: "Remote, Global",
    size: "5,000-10,000",
    openJobs: 18,
    desc: "Airbnb is a community based on connection and belonging. We are building the future of travel with unique homes and experiences.",
  },
  {
    id: 3,
    name: "Linear",
    logo: "L",
    industry: "Productivity",
    location: "Remote, US",
    size: "50-200",
    openJobs: 5,
    desc: "Linear is a purpose-built tool for software planning and building. Streamline issues, projects, and product roadmaps.",
  },
  {
    id: 4,
    name: "Vercel",
    logo: "V",
    industry: "Cloud Computing",
    location: "Remote",
    size: "200-500",
    openJobs: 12,
    desc: "Vercel is the platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.",
  },
  {
    id: 5,
    name: "OpenAI",
    logo: "O",
    industry: "Artificial Intelligence",
    location: "San Francisco, CA",
    size: "500-1,000",
    openJobs: 29,
    desc: "AI research and deployment company. Our mission is to ensure that artificial general intelligence benefits all of humanity.",
  },
  {
    id: 6,
    name: "Notion",
    logo: "N",
    industry: "Software",
    location: "San Francisco, CA",
    size: "500-1,000",
    openJobs: 8,
    desc: "Notion is the all-in-one workspace for your notes, tasks, wikis, and databases. We are building a tool that adapts to your needs.",
  },
];

const Companies = () => {
  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* Header Banner */}
      <div className="companies-header">
        <h1
          style={{
            fontSize: "2.25rem",
            fontWeight: "800",
            marginBottom: "1.5rem",
          }}
        >
          Discover Top Workplaces
        </h1>

        {/* Search Bar - Reused from Job Listings */}
        <div className="search-box">
          <div className="search-input-group">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search by company name or industry"
              className="search-input"
            />
          </div>
          <div className="search-input-group">
            <MapPin size={20} />
            <input
              type="text"
              placeholder="Location or remote"
              className="search-input"
            />
          </div>
          <button className="btn-primary search-submit-btn">Search</button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="companies-container">
        {/* Grid Header Controls */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
            backgroundColor: "white",
            padding: "1rem 1.5rem",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
          }}
        >
          <span style={{ fontSize: "0.95rem", color: "#64748b" }}>
            Showing <strong style={{ color: "#0f172a" }}>2,410</strong>{" "}
            companies
          </span>
          <div style={{ display: "flex", gap: "1rem" }}>
            <select
              style={{
                border: "none",
                background: "transparent",
                fontWeight: "600",
                color: "#0f172a",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option>All Industries</option>
              <option>Technology</option>
              <option>Finance</option>
              <option>Healthcare</option>
            </select>
            <select
              style={{
                border: "none",
                background: "transparent",
                fontWeight: "600",
                color: "#0f172a",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option>Company Size</option>
              <option>1-50 Employees</option>
              <option>51-200 Employees</option>
              <option>201-1000 Employees</option>
            </select>
          </div>
        </div>

        {/* Company Cards Map */}
        <div className="companies-grid">
          {mockCompanies.map((company) => (
            <div key={company.id} className="company-card">
              <div className="company-logo-large">{company.logo}</div>
              <h2 className="company-name">{company.name}</h2>

              <div className="company-meta-row">
                <span className="company-meta-pill">
                  <Building2 size={14} /> {company.industry}
                </span>
                <span className="company-meta-pill">
                  <Globe size={14} /> {company.location}
                </span>
                <span className="company-meta-pill">
                  <Users size={14} /> {company.size}
                </span>
              </div>

              <p className="company-desc">{company.desc}</p>

              <div className="company-footer">
                <span className="open-jobs-badge">
                  {company.openJobs} Open Roles
                </span>
                <Link
                  to={`/companies/${company.id}`}
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    color: "#2563eb",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  View Profile <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Trigger */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <button
            className="btn-primary"
            style={{
              backgroundColor: "white",
              color: "#0f172a",
              border: "1px solid #e2e8f0",
            }}
          >
            Load More Companies
          </button>
        </div>
      </div>
    </div>
  );
};

export default Companies;
