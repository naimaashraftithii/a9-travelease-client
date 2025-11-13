// src/Routes/PrivateRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Loader from "../components/Loader";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader fullscreen text="Checking authentication…" />;

  if (!user) {
    return (
      <Navigate
        to="/register"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return children;
}
