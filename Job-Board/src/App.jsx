import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import MainLayout from "./components/layout/MainLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import JobListings from "./pages/public/JobListings";
import JobDetails from "./pages/public/JobDetails";
import Companies from "./pages/public/Companies";

import DashboardOverview from "./pages/candidate/DashboardOverview";

// --- EMPLOYER SPECIFIC PAGES ---
import PostJob from "./pages/employer/PostJob";

function App() {
  return (
    <Router>
      <Routes>
        {/* */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/companies" element={<Companies />} />
        </Route>

        {/*  PROTECTED CANDIDATE ROUTES */}
        <Route element={<ProtectedRoute allowedRole="candidate" />}>
          <Route
            path="/candidate"
            element={<DashboardLayout role="candidate" />}
          >
            {/*  */}
            <Route path="dashboard" element={<DashboardOverview />} />

            {}
            {}
            {}
          </Route>
        </Route>

        {/* PROTECTED EMPLOYER ROUTES */}
        <Route element={<ProtectedRoute allowedRole="employer" />}>
          <Route path="/employer" element={<DashboardLayout role="employer" />}>
            {/* The URL /employer/dashboard loads the dynamic overview */}
            <Route path="dashboard" element={<DashboardOverview />} />

            {}
            <Route path="post-job" element={<PostJob />} />

            {}
            {}
            {}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
