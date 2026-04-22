import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  Briefcase,
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { loginSuccess } from "../../store/authSlice";

// --- FIREBASE IMPORTS ---
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";

const Login = () => {
  const [role, setRole] = useState("candidate");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // --- NEW: Password Reset States ---
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- 1. STANDARD EMAIL LOGIN ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        dispatch(
          loginSuccess({
            id: user.uid,
            name: userData.name || user.displayName,
            email: user.email,
            role: userData.role,
          }),
        );
        navigate(`/${userData.role}/dashboard`);
      } else {
        throw new Error("User data not found in database.");
      }
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  // --- 2. GOOGLE EXPRESS LOGIN ---
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      let userRole = role;

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          role: role,
          createdAt: new Date().toISOString(),
        });
      } else {
        userRole = docSnap.data().role;
      }

      dispatch(
        loginSuccess({
          id: user.uid,
          name: user.displayName,
          email: user.email,
          role: userRole,
        }),
      );

      navigate(`/${userRole}/dashboard`);
    } catch (err) {
      console.error("Google Login Error:", err);
      setError("Failed to authenticate with Google.");
    } finally {
      setLoading(false);
    }
  };

  // --- 3. PASSWORD RESET PROTOCOL ---
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!email) {
        throw new Error("Please enter your email address first.");
      }
      // Instruct Firebase to send the secure reset link
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (err) {
      console.error("Reset Error:", err);
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError("Failed to send reset email. Please try again.");
      }
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

          {/* --- DYNAMIC UI RENDERING --- */}
          {isForgotPassword ? (
            /* VIEW A: FORGOT PASSWORD FORM */
            <div className="fade-in-animation">
              <button
                type="button"
                onClick={() => {
                  setIsForgotPassword(false);
                  setResetSent(false);
                  setError("");
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "#64748b",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  marginBottom: "1.5rem",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                }}
              >
                <ArrowLeft size={16} /> Back to login
              </button>

              <h1 className="auth-title">Reset password</h1>
              <p className="auth-subtitle">
                Enter your email and we'll send you a secure link to reset your
                password.
              </p>

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

              {resetSent ? (
                <div
                  style={{
                    padding: "1.5rem",
                    backgroundColor: "#ecfdf5",
                    borderRadius: "12px",
                    border: "1px solid #a7f3d0",
                    textAlign: "center",
                  }}
                >
                  <CheckCircle
                    size={32}
                    color="#059669"
                    style={{ margin: "0 auto 1rem" }}
                  />
                  <h3
                    style={{
                      color: "#065f46",
                      fontWeight: "700",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Check your inbox
                  </h3>
                  <p
                    style={{
                      color: "#047857",
                      fontSize: "0.9rem",
                      lineHeight: "1.5",
                    }}
                  >
                    We've sent a password reset link to <strong>{email}</strong>
                    . Please check your spam folder if you don't see it within 2
                    minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handlePasswordReset}>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
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

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      opacity: loading ? 0.7 : 1,
                      marginTop: "0.5rem",
                    }}
                  >
                    {loading ? "Sending..." : "Send Reset Link"}{" "}
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* VIEW B: STANDARD LOGIN FORM */
            <div className="fade-in-animation">
              <h1 className="auth-title">Welcome back</h1>
              <p className="auth-subtitle">
                Log in to access your{" "}
                {role === "candidate" ? "applications" : "dashboard"}.
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

              <div style={{ marginBottom: "1rem" }}>
                <button
                  type="button"
                  onClick={handleGoogleLogin}
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
                  Continue with Google
                </button>
              </div>

              <div className="auth-divider">or log in with email</div>

              <form onSubmit={handleLogin}>
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

                <div className="form-group" style={{ marginBottom: "0.5rem" }}>
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
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {/* --- WIRED THE FORGOT PASSWORD LINK HERE --- */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: "1.25rem",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(true);
                      setError("");
                    }}
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      color: "#2563eb",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    Forgot password?
                  </button>
                </div>

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
                  {loading ? "Signing In..." : "Sign In"}{" "}
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
                Don't have an account?{" "}
                <Link
                  to="/register"
                  style={{ fontWeight: "600", color: "#2563eb" }}
                >
                  Sign up
                </Link>
              </p>
            </div>
          )}
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
            The platform built for modern{" "}
            {role === "candidate" ? "careers" : "hiring teams"}.
          </h2>
          <p style={{ fontSize: "1rem", color: "#e0e7ff", lineHeight: "1.5" }}>
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
