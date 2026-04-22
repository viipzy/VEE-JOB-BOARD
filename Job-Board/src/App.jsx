import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts & Guards
import MainLayout from "./components/layout/MainLayout.jsx";
import DashboardLayout from "./components/layout/DashboardLayout.jsx";
import ProtectedRoute from "./components/layout/ProtectedRoute.jsx"; // <-- New Import

// Public Pages
import Home from "./pages/public/Home.jsx";
import JobListings from "./pages/public/JobListings.jsx";
import Companies from "./pages/public/Companies.jsx";
import Login from "./pages/public/Login.jsx";
import Register from "./pages/public/Register.jsx";

// Dashboard Pages
import DashboardOverview from "./pages/candidate/DashboardOverview.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* --- 1. Public Website --- */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/companies" element={<Companies />} />
        </Route>

        {/* --- 2. Standalone Auth Pages --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* --- 3. Protected CANDIDATE Routes --- */}
        <Route element={<ProtectedRoute allowedRole="candidate" />}>
          <Route
            path="/candidate"
            element={<DashboardLayout role="candidate" />}
          >
            <Route path="dashboard" element={<DashboardOverview />} />
            {/* Future Candidate routes will go here: /saved, /applications, /settings */}
          </Route>
        </Route>

        {/* --- 4. Protected EMPLOYER Routes --- */}
        <Route element={<ProtectedRoute allowedRole="employer" />}>
          <Route path="/employer" element={<DashboardLayout role="employer" />}>
            <Route path="dashboard" element={<DashboardOverview />} />
            {/* Future Employer routes will go here: /jobs, /applicants, /settings */}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
