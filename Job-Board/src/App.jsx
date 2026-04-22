import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "./components/layout/MainLayout.jsx";
import DashboardLayout from "./components/layout/DashboardLayout.jsx";

// Public Pages
import Home from "./pages/public/Home.jsx";
import JobListings from "./pages/public/JobListings.jsx";
import Companies from "./pages/public/Companies.jsx";
import Login from "./pages/public/Login.jsx";
import Register from "./pages/public/Register.jsx";

// (Assume your dashboard imports are here)
import DashboardOverview from "./pages/candidate/DashboardOverview.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* --- 1. Public Website (Header + Footer) --- */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/companies" element={<Companies />} />
          {/* If you have an About or Contact page later, they go here too! */}
        </Route>

        {/* --- 2. Standalone Auth Pages (No Header/Footer) --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* --- 3. Protected Dashboard (Sidebar + Topbar) --- */}
        <Route path="/candidate" element={<DashboardLayout role="candidate" />}>
          <Route path="dashboard" element={<DashboardOverview />} />
          {/* Other candidate routes... */}
        </Route>

        <Route path="/employer" element={<DashboardLayout role="employer" />}>
          <Route path="dashboard" element={<DashboardOverview />} />
          {/* Other employer routes... */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
