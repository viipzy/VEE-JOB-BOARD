import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Briefcase, Mail, Lock, User, ArrowRight } from "lucide-react";
import { loginSuccess } from "../../store/authSlice";

// --- FIREBASE IMPORTS ---
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";

const Register = () => {
  const [role, setRole] = useState("candidate");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- PROTOCOL 1: MANUAL REGISTRATION (Email & Password) ---
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Create the user credential in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      // 2. Attach the user's full name to their authentication profile
      await updateProfile(user, { displayName: name });

      // 3. Construct the database record
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        role: role,
        createdAt: new Date().toISOString(),
      });

      // 4. Issue the local security clearance (Redux)
      dispatch(
        loginSuccess({
          id: user.uid,
          name: name,
          email: email,
          role: role,
        }),
      );

      // 5. Route to the appropriate sector
      navigate(`/${role}/dashboard`);
    } catch (err) {
      console.error("Registration Error:", err);
      // Simplify the error message for the user interface
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please log in.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // --- PROTOCOL 2: EXPRESS REGISTRATION (Google Auth) ---
  const handleGoogleSignup = async () => {
    setLoading(true);
    setError("");

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      let finalRole = role;

      // Critical Check: Prevent overwriting an existing user's role
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          role: role, // Assign the role currently selected on the UI toggle
          createdAt: new Date().toISOString(),
        });
      } else {
        finalRole = docSnap.data().role;
      }

      dispatch(
        loginSuccess({
          id: user.uid,
          name: user.displayName,
          email: user.email,
          role: finalRole,
        }),
      );

      navigate(`/${finalRole}/dashboard`);
    } catch (err) {
      console.error("Google Signup Error:", err);
      setError("Failed to register with Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-side">
        <div className="auth-form-wrapper">
          <Link
            to="/"
            className="brand-logo"
            style={{ marginBottom: "1.5rem" }}
          >
            <div className="brand-icon">V</div>
            <span>Vee.</span>
          </Link>

          <h1 className="auth-title">Create an account</h1>
          <p className="auth-subtitle">
            Join thousands of{" "}
            {role === "candidate" ? "professionals" : "companies"} today.
          </p>

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

          {/* Diagnostic Display Area */}
          {error && (
            <div
              style={{
                padding: "0.75rem",
                backgroundColor: "#fef2f2",
                color: "#dc2626",
                borderRadius: "8px",
                fontSize: "0.85rem",
                marginBottom: "1rem",
                border: "1px solid #fecaca",
              }}
            >
              {error}
            </div>
          )}

          {/* Full-Width Google Intake Portal */}
          <div style={{ marginBottom: "1rem" }}>
            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={loading}
              className="social-btn"
              style={{
                width: "100%",
                padding: "0.85rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <svg
                width="18"
                height="18"
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
              Sign up with Google
            </button>
          </div>

          <div className="auth-divider">or register with email</div>

          {/* Manual Intake Form */}
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <User size={16} />
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
                  <Mail size={16} />
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
                  <Lock size={16} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="premium-input"
                  placeholder="Create a password"
                  minLength={8}
                />
              </div>
            </div>

            <p
              style={{
                fontSize: "0.75rem",
                color: "#64748b",
                marginBottom: "1.25rem",
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
              disabled={loading}
              className="btn-primary"
              style={{
                width: "100%",
                padding: "0.75rem",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Processing..." : "Create Account"}{" "}
              <ArrowRight size={16} />
            </button>
          </form>

          <p
            style={{
              marginTop: "1.5rem",
              textAlign: "center",
              fontSize: "0.85rem",
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

      <div className="auth-visual-side">
        <div className="auth-visual-glow"></div>
        <div className="auth-glass-card">
          <div
            style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#3b82f6",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.25rem",
            }}
          >
            <Briefcase size={24} color="white" />
          </div>
          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: "800",
              marginBottom: "0.75rem",
              lineHeight: "1.2",
            }}
          >
            Start your journey with Vee.
          </h2>
          <p style={{ fontSize: "1rem", color: "#e0e7ff", lineHeight: "1.5" }}>
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
