import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRole }) => {
  // 1. Read the current authentication state from the Redux brain
  const authState = useSelector((state) => state.auth) || {
    isAuthenticated: false,
    user: null,
  };
  const { isAuthenticated, user } = authState;

  // 2. Security Check 1: Are they logged in at all?
  if (!isAuthenticated) {
    // If not, kick them back to the login page immediately
    return <Navigate to="/login" replace />;
  }

  // 3. Security Check 2: Are they trying to access the wrong role's dashboard?
  if (allowedRole && user?.role !== allowedRole) {
    console.warn(
      `Access Denied: ${user.role} attempted to access ${allowedRole} route.`,
    );
    // If a candidate tries to view employer pages, redirect them to their own dashboard
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  // 4. If all security checks pass, render the requested page components
  return <Outlet />;
};

export default ProtectedRoute;
