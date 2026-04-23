import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// --- LAYOUTS ---
import MainLayout from "./components/layout/MainLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";

// --- PUBLIC PAGES ---
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import JobListings from "./pages/public/JobListings";
import JobDetails from "./pages/public/JobDetails";
import Companies from "./pages/public/Companies";

// --- DASHBOARD PAGES ---
// Using the dynamic overview component we updated earlier
import DashboardOverview from "./pages/candidate/DashboardOverview";

// --- EMPLOYER SPECIFIC PAGES ---
import PostJob from "./pages/employer/PostJob";

function App() {
  return (
    <Router>
      <Routes>
        {/* =========================================
            PUBLIC ROUTES (Standard Header/Footer)
        ========================================= */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/companies" element={<Companies />} />
        </Route>

        {/* =========================================
            PROTECTED CANDIDATE ROUTES
        ========================================= */}
        <Route element={<ProtectedRoute allowedRole="candidate" />}>
          <Route
            path="/candidate"
            element={<DashboardLayout role="candidate" />}
          >
            {/* The URL /candidate/dashboard loads the dynamic overview */}
            <Route path="dashboard" element={<DashboardOverview />} />

            {/* Future Candidate Routes will go here */}
            {/* <Route path="saved-jobs" element={<SavedJobs />} /> */}
            {/* <Route path="profile" element={<CandidateProfile />} /> */}
          </Route>
        </Route>

        {/* =========================================
            PROTECTED EMPLOYER ROUTES
        ========================================= */}
        <Route element={<ProtectedRoute allowedRole="employer" />}>
          <Route path="/employer" element={<DashboardLayout role="employer" />}>
            {/* The URL /employer/dashboard loads the dynamic overview */}
            <Route path="dashboard" element={<DashboardOverview />} />

            {/* THE NEW ROUTE: Connects the "Post New Job" button to the form */}
            <Route path="post-job" element={<PostJob />} />

            {/* Future Employer Routes will go here */}
            {/* <Route path="manage-jobs" element={<ManageJobs />} /> */}
            {/* <Route path="applicants" element={<Applicants />} /> */}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
