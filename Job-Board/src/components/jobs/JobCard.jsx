import { Bookmark, MapPin, DollarSign, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/jobs/${job.id}`);
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    console.log(`Bookmark clicked for job ${job.id}`);
  };

  return (
    <div className="job-card" onClick={handleNavigation}>
      {/* Top Section: Logo, Title, Bookmark */}
      <div className="job-card-header">
        <div className="job-card-company">
          <div className="job-logo">{job.company[0]}</div>
          <div>
            <h3 className="job-title">{job.title}</h3>
            <p className="job-company-name">{job.company}</p>
          </div>
        </div>

        <button
          onClick={handleBookmark}
          style={{ background: "none", color: "#cbd5e1" }}
        >
          <Bookmark size={22} />
        </button>
      </div>

      {/* Middle Section: Location, Salary, Time */}
      <div className="job-meta-container">
        <span className="job-meta-item">
          <MapPin size={14} /> {job.location}
        </span>
        <span className="job-meta-item">
          <DollarSign size={14} /> {job.salary}
        </span>
        <span className="job-meta-item">
          <Clock size={14} /> {job.postedAt}
        </span>
      </div>

      {/* Bottom Section: Badges */}
      <div className="job-badges">
        <span className="badge badge-type">{job.type}</span>
        <span className="badge badge-level">{job.level}</span>
        {job.featured && <span className="badge badge-featured">Featured</span>}
      </div>
    </div>
  );
};

export default JobCard;
