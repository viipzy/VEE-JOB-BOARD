import { Search, MapPin, Filter } from "lucide-react";
import JobCard from "../../components/jobs/JobCard.jsx";

const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    company: "Stripe",
    location: "Remote, US",
    salary: "$140k - $180k",
    type: "Full-time",
    level: "Senior",
    postedAt: "2 days ago",
    featured: true,
  },
  {
    id: 2,
    title: "Product Designer",
    company: "Airbnb",
    location: "San Francisco, CA",
    salary: "$120k - $150k",
    type: "Contract",
    level: "Mid-Level",
    postedAt: "5 hours ago",
    featured: false,
  },
  {
    id: 3,
    title: "Backend Developer (Go)",
    company: "Uber",
    location: "New York, NY",
    salary: "$130k - $160k",
    type: "Full-time",
    level: "Mid-Level",
    postedAt: "1 day ago",
    featured: false,
  },
  {
    id: 4,
    title: "Growth Marketing Manager",
    company: "Notion",
    location: "Remote",
    salary: "$90k - $120k",
    type: "Full-time",
    level: "Mid-Level",
    postedAt: "3 days ago",
    featured: false,
  },
];

const JobListings = () => {
  return (
    <div className="find-jobs-wrapper">
      {/* Header Section */}
      <div className="find-jobs-header">
        <h1
          style={{
            fontSize: "2.25rem",
            fontWeight: "800",
            marginBottom: "1.5rem",
          }}
        >
          Find Your Next Great Opportunity
        </h1>

        <div className="search-box">
          <div className="search-input-group">
            <Search size={20} />
            <input
              type="text"
              placeholder="Job title or keyword"
              className="search-input"
            />
          </div>
          <div className="search-input-group">
            <MapPin size={20} />
            <input
              type="text"
              placeholder="City, state, or remote"
              className="search-input"
            />
          </div>
          <button className="btn-primary search-submit-btn">Search</button>
        </div>
      </div>

      {/* Main Structural Grid */}
      <div className="find-jobs-grid">
        {/* The Index: Sticky Filter Panel */}
        <aside className="filter-panel">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.1rem",
                fontWeight: "800",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Filter size={18} /> Filters
            </h2>
            <button
              style={{
                background: "none",
                color: "#2563eb",
                fontSize: "0.85rem",
                fontWeight: "600",
              }}
            >
              Clear all
            </button>
          </div>

          <div className="filter-group">
            <h3 className="filter-heading">Job Type</h3>
            {["Full-time", "Part-time", "Contract", "Internship"].map(
              (type) => (
                <label key={type} className="filter-option">
                  <input
                    type="checkbox"
                    style={{
                      width: "16px",
                      height: "16px",
                      accentColor: "#2563eb",
                    }}
                  />
                  <span>{type}</span>
                </label>
              ),
            )}
          </div>

          <div className="filter-group">
            <h3 className="filter-heading">Experience Level</h3>
            {["Entry Level", "Mid-Level", "Senior", "Director"].map((level) => (
              <label key={level} className="filter-option">
                <input
                  type="checkbox"
                  style={{
                    width: "16px",
                    height: "16px",
                    accentColor: "#2563eb",
                  }}
                />
                <span>{level}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* The Archive: Job Feed */}
        <div className="job-feed">
          <div className="feed-controls">
            <span style={{ fontSize: "0.9rem", color: "#64748b" }}>
              Showing <strong style={{ color: "#0f172a" }}>432</strong> jobs
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
                Sort by:
              </span>
              <select
                style={{
                  border: "none",
                  background: "transparent",
                  fontWeight: "600",
                  color: "#0f172a",
                  outline: "none",
                }}
              >
                <option>Most Relevant</option>
                <option>Newest Postings</option>
                <option>Highest Salary</option>
              </select>
            </div>
          </div>

          {/* Render the structural support units (Job Cards) */}
          {mockJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}

          <button
            className="btn-primary"
            style={{
              backgroundColor: "white",
              color: "#0f172a",
              border: "1px solid #e2e8f0",
              marginTop: "1rem",
            }}
          >
            Load More Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobListings;
