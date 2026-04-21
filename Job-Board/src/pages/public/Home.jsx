import { Search, MapPin } from "lucide-react";
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
];

const Home = () => {
  return (
    <div>
      {/* Premium Hero Section */}
      <section className="hero-section">
        <span className="hero-badge">✨ Over 10,000+ tech jobs available</span>

        <h1 className="hero-title">
          Find the work that <br />
          <span className="text-gradient">fits your life.</span>
        </h1>

        <p className="hero-subtitle">
          Discover premier opportunities at top-tier companies. Build your
          profile, apply with one click, and track your career growth.
        </p>

        {/* Central Search Engine */}
        <div className="search-box">
          <div className="search-input-group">
            <Search size={20} />
            <input
              type="text"
              placeholder="Job title, keywords, or company"
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
          {/* Replaced inline styles with a dedicated class */}
          <button className="btn-primary search-submit-btn">Search</button>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section style={{ background: "white", borderTop: "1px solid #e2e8f0" }}>
        <div className="section-container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Featured Opportunities</h2>
              <p className="section-desc">
                Hand-picked jobs from top companies.
              </p>
            </div>
            <a href="#" className="link-primary">
              View all jobs &rarr;
            </a>
          </div>

          <div className="job-grid">
            {mockJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
