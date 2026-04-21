import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout.jsx";
import DashboardLayout from "./components/layout/DashboardLayout";

// Public Pages
import Home from "./pages/public/Home.jsx";
import JobListings from "./pages/public/JobListings.jsx";
import JobDetails from "./pages/public/JobDetails.jsx";
import Login from "./pages/public/Login.jsx";
import Register from "./pages/public/Register.jsx"; // Add this line

// Protected Pages
import DashboardOverview from "./pages/candidate/DashboardOverview";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Marketing & Discovery Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="jobs" element={<JobListings />} />
          <Route path="jobs/:id" element={<JobDetails />} />
        </Route>
        {/* Unprotected Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {}
        {/* Protected Candidate Dashboard */}
        <Route
          path="/candidate"
          element={<DashboardLayout allowedRole="candidate" />}
        >
          <Route path="dashboard" element={<DashboardOverview />} />
          {/* Future routes: applications, saved, resume, settings */}
        </Route>
        {/* Protected Employer Dashboard */}
        <Route
          path="/employer"
          element={<DashboardLayout allowedRole="employer" />}
        >
          {/* Future routes: dashboard, post-job, manage-jobs, applicants */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
