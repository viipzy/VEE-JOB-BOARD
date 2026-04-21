import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Briefcase, Mail, Lock, User, ArrowRight } from "lucide-react";
// import { loginSuccess } from '../../store/authSlice';

const Register = () => {
  const [role, setRole] = useState("candidate");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Simulate API registration payload
    const userPayload = {
      id: Math.random().toString(36).substr(2, 9),
      name: name,
      email: email,
      role: role,
    };

    // dispatch(loginSuccess(userPayload)); // Auto-login after registration
    console.log("Registered as:", userPayload);

    // Route to appropriate dashboard
    if (role === "employer") {
      navigate("/employer/dashboard");
    } else {
      navigate("/candidate/dashboard");
    }
  };

  const handleSocialSignup = (provider) => {
    console.log(`Initiating ${provider} sign up for ${role}...`);
  };

  return (
    <div className="auth-container">
      {/* Left side: Functional Form */}
      <div className="auth-form-side">
        <div className="auth-form-wrapper">
          <Link
            to="/"
            className="brand-logo"
            style={{ marginBottom: "2.5rem" }}
          >
            <div className="brand-icon">V</div>
            <span>Vee.</span>
          </Link>

          <h1 className="auth-title">Create an account</h1>
          <p className="auth-subtitle">
            Join thousands of{" "}
            {role === "candidate" ? "professionals" : "companies"} today.
          </p>

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

          {/* Social Sign Up Buttons */}
          <div className="social-login-group">
            <button
              type="button"
              onClick={() => handleSocialSignup("Google")}
              className="social-btn"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>

            <button
              type="button"
              onClick={() => handleSocialSignup("LinkedIn")}
              className="social-btn"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  fill="#0A66C2"
                />
              </svg>
              LinkedIn
            </button>
          </div>

          <div className="auth-divider">or register with email</div>

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="premium-input"
                  placeholder="John Doe"
                />
              </div>
            </div>

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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="premium-input"
                  placeholder="Create a password (min. 8 characters)"
                  minLength={8}
                />
              </div>
            </div>

            <p
              style={{
                fontSize: "0.8rem",
                color: "#64748b",
                marginBottom: "1.5rem",
                lineHeight: "1.5",
              }}
            >
              By creating an account, you agree to our{" "}
              <a href="#" style={{ color: "#2563eb" }}>
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" style={{ color: "#2563eb" }}>
                Privacy Policy
              </a>
              .
            </p>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: "100%", padding: "0.85rem" }}
            >
              Create Account <ArrowRight size={18} />
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
            Already have an account?{" "}
            <Link to="/login" style={{ fontWeight: "600", color: "#2563eb" }}>
              Log in
            </Link>
          </p>
        </div>
      </div>

      {/* Right side: Branded Visual */}
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
            Start your journey with Vee.
          </h2>

          <p
            style={{ fontSize: "1.1rem", color: "#e0e7ff", lineHeight: "1.6" }}
          >
            {role === "candidate"
              ? "Create your profile once, and apply to thousands of curated opportunities with a single click."
              : "Build your employer brand, post jobs, and connect with the top 1% of vetted talent globally."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
