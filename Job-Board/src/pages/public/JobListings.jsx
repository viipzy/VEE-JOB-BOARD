import { useState, useEffect } from "react";
import { Search, MapPin, Filter } from "lucide-react";
import JobCard from "../../components/jobs/JobCard";
import { fetchJobs } from "../../firebase/jobServices";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search States
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  // 1. Initial Data Load
  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      const data = await fetchJobs();
      setJobs(data);
      setFilteredJobs(data);
      setLoading(false);
    };
    loadJobs();
  }, []);

  // 2. The Debounce Engine (Waits 500ms after user stops typing to trigger search)
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timerId); // Cleanup if user types again before 500ms
  }, [searchTerm]);

  // 3. The Filter Logic (Runs only when debounced term changes)
  useEffect(() => {
    if (!debouncedTerm.trim()) {
      setFilteredJobs(jobs);
      return;
    }

    const lowerCaseSearch = debouncedTerm.toLowerCase();
    const results = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(lowerCaseSearch) ||
        job.companyName.toLowerCase().includes(lowerCaseSearch) ||
        job.tags?.some((tag) => tag.toLowerCase().includes(lowerCaseSearch)),
    );

    setFilteredJobs(results);
  }, [debouncedTerm, jobs]);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            color: "#0f172a",
            marginBottom: "1rem",
          }}
        >
          Find your next role.
        </h1>
        <p style={{ color: "#64748b", fontSize: "1.1rem" }}>
          Explore {jobs.length} open opportunities across the globe.
        </p>
      </div>

      {/* The Search Bar UI */}
      <div className="search-box" style={{ marginBottom: "3rem" }}>
        <div className="search-input-group">
          <Search size={20} />
          <input
            type="text"
            className="search-input"
            placeholder="Job title, keyword, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="search-input-group">
          <MapPin size={20} />
          <input
            type="text"
            className="search-input"
            placeholder="City, state, or remote"
          />
        </div>
        <button className="btn-primary search-submit-btn">Search Roles</button>
      </div>

      {/* Empty State vs Results */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "#64748b" }}>
          Loading opportunities...
        </div>
      ) : filteredJobs.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "4rem",
            backgroundColor: "#f8fafc",
            borderRadius: "16px",
            border: "1px dashed #cbd5e1",
          }}
        >
          <Filter size={48} color="#94a3b8" style={{ margin: "0 auto 1rem" }} />
          <h3
            style={{ fontSize: "1.25rem", fontWeight: "600", color: "#0f172a" }}
          >
            No matching jobs found
          </h3>
          <p style={{ color: "#64748b", marginTop: "0.5rem" }}>
            Try adjusting your keywords or clearing your filters.
          </p>
          <button
            onClick={() => setSearchTerm("")}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              background: "#e2e8f0",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="job-grid">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobListings;
