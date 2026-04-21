import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Briefcase, Mail, Lock, ArrowRight } from "lucide-react";
// import { loginSuccess } from '../../store/authSlice'; // Uncomment when authSlice is ready

const Login = () => {
  const [role, setRole] = useState("candidate");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate API authentication payload
    const userPayload = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split("@")[0] || "User",
      email: email,
      role: role,
    };

    // dispatch(loginSuccess(userPayload)); // Uncomment when authSlice is ready
    console.log("Logged in as:", userPayload);

    // Route to appropriate dashboard
    if (role === "employer") {
      navigate("/employer/dashboard");
    } else {
      navigate("/candidate/dashboard");
    }
  };

  return (
    <div className="auth-container">
      {/* Left side: Functional Form */}
      <div className="auth-form-side">
        <div className="auth-form-wrapper">
          <Link to="/" className="brand-logo" style={{ marginBottom: "3rem" }}>
            <div className="brand-icon">V</div>
            <span>Vee.</span>
          </Link>

          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Please enter your details to sign in.</p>

          {/* Role Toggle */}
          <div className="role-toggle">
            <button
              type="button"
              onClick={() => setRole("candidate")}
              className={`role-btn ${role === "candidate" ? "active" : ""}`}
            >
              Job Seeker
            </button>
            <button
              type="button"
              onClick={() => setRole("employer")}
              className={`role-btn ${role === "employer" ? "active" : ""}`}
            >
              Employer
            </button>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="premium-input"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  className="premium-input"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  style={{
                    accentColor: "#2563eb",
                    width: "16px",
                    height: "16px",
                  }}
                />
                <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
                  Remember for 30 days
                </span>
              </label>
              <a
                href="#"
                style={{
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  color: "#2563eb",
                }}
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: "100%", padding: "0.85rem" }}
            >
              Sign In <ArrowRight size={18} />
            </button>
          </form>

          <p
            style={{
              marginTop: "2rem",
              textAlign: "center",
              fontSize: "0.9rem",
              color: "#64748b",
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ fontWeight: "600", color: "#2563eb" }}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right side: Branded Visual (Hidden on mobile) */}
      <div className="auth-visual-side">
        <div className="auth-visual-glow"></div>

        <div className="auth-glass-card">
          <div
            style={{
              width: "56px",
              height: "56px",
              backgroundColor: "#3b82f6",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.5rem",
            }}
          >
            <Briefcase size={28} color="white" />
          </div>

          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "800",
              marginBottom: "1rem",
              lineHeight: "1.2",
            }}
          >
            The platform built for modern{" "}
            {role === "candidate" ? "careers" : "hiring teams"}.
          </h2>

          <p
            style={{ fontSize: "1.1rem", color: "#e0e7ff", lineHeight: "1.6" }}
          >
            {role === "candidate"
              ? "Join thousands of professionals finding their dream roles at companies that value their skills."
              : "Access a curated pool of top-tier talent and streamline your entire recruitment pipeline."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
