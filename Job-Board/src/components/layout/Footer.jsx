import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        {/* Top Section: Newsletter Subscription */}
        <div className="footer-newsletter">
          <div>
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: "800",
                color: "white",
                marginBottom: "0.5rem",
              }}
            >
              Never miss an opportunity.
            </h2>
            <p style={{ color: "#e0e7ff", fontSize: "1.05rem" }}>
              Get the latest tech roles delivered straight to your inbox.
            </p>
          </div>
          <form
            className="newsletter-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="newsletter-input"
              required
            />
            <button type="submit" className="newsletter-btn">
              Subscribe
            </button>
          </form>
        </div>

        {/* Middle Section: 5-Column Navigation Grid */}
        <div className="footer-grid">
          {/* Column 1: Brand & Social */}
          <div className="footer-brand">
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "white",
                fontSize: "1.5rem",
                fontWeight: "800",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  background: "#2563eb",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                V
              </div>
              <span>Vee.</span>
            </Link>
            <p>
              Connecting top-tier candidates with the world's most innovative
              employers. Your next great chapter starts here.
            </p>
            <div className="footer-socials">
              {/* LinkedIn */}
              <a href="#" className="footer-social-btn" aria-label="LinkedIn">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              {/* Twitter (X) */}
              <a href="#" className="footer-social-btn" aria-label="Twitter">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 4.15H5.078z" />
                </svg>
              </a>

              {/* Instagram */}
              <a href="#" className="footer-social-btn" aria-label="Instagram">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* Facebook */}
              <a href="#" className="footer-social-btn" aria-label="Facebook">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="footer-heading">Platform</h3>
            <div className="footer-links">
              <Link to="/" className="footer-link">
                Home
              </Link>
              <Link to="/about" className="footer-link">
                About Us
              </Link>
              <Link to="/companies" className="footer-link">
                Companies
              </Link>
              <Link to="/contact" className="footer-link">
                Contact
              </Link>
              <Link to="/blog" className="footer-link">
                Resources & Blog
              </Link>
            </div>
          </div>

          {/* Column 3: Candidates */}
          <div>
            <h3 className="footer-heading">Candidates</h3>
            <div className="footer-links">
              <Link to="/jobs" className="footer-link">
                Browse Jobs
              </Link>
              <Link to="/register" className="footer-link">
                Create Account
              </Link>
              <Link to="/candidate/dashboard" className="footer-link">
                Upload CV
              </Link>
              <Link to="/jobs" className="footer-link">
                Job Alerts
              </Link>
            </div>
          </div>

          {/* Column 4: Employers */}
          <div>
            <h3 className="footer-heading">Employers</h3>
            <div className="footer-links">
              <Link to="/employer/jobs" className="footer-link">
                Post a Job
              </Link>
              <Link to="/pricing" className="footer-link">
                Pricing Plans
              </Link>
              <Link to="/employer/applicants" className="footer-link">
                Talent Search
              </Link>
              <Link to="/employer/dashboard" className="footer-link">
                Employer Dashboard
              </Link>
            </div>
          </div>

          {/* Column 5: Contact Info */}
          <div>
            <h3 className="footer-heading">Contact Us</h3>
            <div className="footer-contact-item">
              <Mail
                size={18}
                style={{ color: "#2563eb", flexShrink: 0, marginTop: "2px" }}
              />
              <span>hello@veejobboard.com</span>
            </div>
            <div className="footer-contact-item">
              <Phone
                size={18}
                style={{ color: "#2563eb", flexShrink: 0, marginTop: "2px" }}
              />
              <span>+234 (0) 800 000 0000</span>
            </div>
            <div className="footer-contact-item">
              <MapPin
                size={18}
                style={{ color: "#2563eb", flexShrink: 0, marginTop: "2px" }}
              />
              <span>
                123 Innovation Drive,
                <br />
                Tech District, Remote
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Legal */}
        <div className="footer-bottom">
          <div className="footer-bottom-text">
            &copy; 2026 Vee Technologies. All rights reserved.
          </div>
          <div className="footer-legal-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
