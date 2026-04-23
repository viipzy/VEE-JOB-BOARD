import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Bookmark, MapPin, DollarSign, Clock } from "lucide-react";
import { toggleSavedJob } from "../../firebase/jobServices"; // The file we created earlier

const JobCard = ({ job, initialSavedStatus = false }) => {
  // Pull the current user from our Redux brain
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Local state for our Optimistic UI
  const [isSaved, setIsSaved] = useState(initialSavedStatus);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSaveToggle = async (e) => {
    // Prevent the click from bubbling up if the whole card is a link
    e.preventDefault();
    e.stopPropagation();

    // Security check: Only logged-in candidates can save jobs
    if (!isAuthenticated || user?.role !== "candidate") {
      alert("Please log in as a candidate to save jobs.");
      return;
    }

    if (isProcessing) return; // Prevent spam clicking

    // 1. OPTIMISTIC UPDATE: Change the UI instantly
    const previousState = isSaved;
    setIsSaved(!isSaved);
    setIsProcessing(true);

    try {
      // 2. DATABASE TRANSACTION: Talk to Firebase in the background
      await toggleSavedJob(user.id, job.id, previousState);
    } catch (error) {
      // 3. ROLLBACK: If Firebase fails, silently revert the UI back to how it was
      console.error("Sync failed, rolling back UI state");
      setIsSaved(previousState);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="job-card" style={{ position: "relative" }}>
      <div className="job-card-header">
        <div className="job-card-company">
          <div className="job-logo">{job.companyName?.charAt(0) || "C"}</div>
          <div>
            <h3 className="job-title">{job.title}</h3>
            <span className="job-company-name">{job.companyName}</span>
          </div>
        </div>

        {/* --- THE INTERACTIVE SAVE BUTTON --- */}
        {user?.role !== "employer" && (
          <button
            onClick={handleSaveToggle}
            disabled={isProcessing}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              borderRadius: "50%",
              backgroundColor: isSaved ? "#eff6ff" : "transparent",
              transition: "all 0.2s ease",
            }}
            title={isSaved ? "Remove from saved" : "Save this job"}
          >
            <Bookmark
              size={20}
              color={isSaved ? "#2563eb" : "#64748b"}
              fill={isSaved ? "#2563eb" : "none"}
            />
          </button>
        )}
      </div>

      <div className="job-meta-container">
        <div className="job-meta-item">
          <MapPin size={16} /> {job.location || "Remote"}
        </div>
        <div className="job-meta-item">
          <DollarSign size={16} /> {job.salary || "Competitive"}
        </div>
        <div className="job-meta-item">
          <Clock size={16} /> {job.type || "Full-time"}
        </div>
      </div>

      <div className="job-badges">
        {job.tags?.map((tag, index) => (
          <span key={index} className="badge badge-level">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default JobCard;
