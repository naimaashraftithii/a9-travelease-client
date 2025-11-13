import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext.js";
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const loc = useLocation();

  if (loading) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <div className="flex flex-col items-center gap-3">
          <Loader />
          <p className="text-sm opacity-80">Checking your session…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: loc, reason: "auth_required" }} replace />;
  }
  return children;
}
