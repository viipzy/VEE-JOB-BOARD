import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createJobPosting } from "../../firebase/jobServices";

const PostJob = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    salary: "",
    type: "Full-time",
    description: "",
    tags: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert comma-separated tags into an array
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      const jobData = {
        title: formData.title,
        location: formData.location,
        salary: formData.salary,
        type: formData.type,
        description: formData.description,
        tags: tagsArray,
      };

      await createJobPosting(user.id, user.name, jobData);
      setSuccess(true);

      // Reset form or redirect after 2 seconds
      setTimeout(() => navigate("/employer/dashboard"), 2000);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          color: "#0f172a",
        }}
      >
        Post a New Opportunity
      </h2>

      {success && (
        <div
          style={{
            padding: "1rem",
            backgroundColor: "#dcfce7",
            color: "#166534",
            borderRadius: "8px",
            marginBottom: "1.5rem",
          }}
        >
          Job successfully published! Redirecting to dashboard...
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
        }}
      >
        <div className="form-group">
          <label className="form-label">Job Title</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="premium-input"
            placeholder="e.g. Senior React Developer"
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <div className="form-group">
            <label className="form-label">Location</label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="premium-input"
              placeholder="e.g. Lagos, Nigeria (Remote)"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Salary Range</label>
            <input
              type="text"
              name="salary"
              required
              value={formData.salary}
              onChange={handleChange}
              className="premium-input"
              placeholder="e.g. $80k - $120k"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Job Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="premium-input"
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Freelance</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">
            Tech Stack / Tags (Comma separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="premium-input"
            placeholder="React, Node.js, Frontend"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Job Description</label>
          <textarea
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
            className="premium-input"
            rows="6"
            placeholder="Describe the responsibilities and requirements..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
          style={{ padding: "1rem", marginTop: "1rem" }}
        >
          {loading ? "Publishing..." : "Publish Job Posting"}
        </button>
      </form>
    </div>
  );
};

export default PostJob;
