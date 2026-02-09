import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export default function RequireAuth() {
  const location = useLocation();
  const { booting, isAuthed } = useAuth();

  if (booting) return <div style={{ padding: 20 }}>Loading...</div>;

  if (!isAuthed)
    return <Navigate to="/login" replace state={{ from: location }} />;

  return <Outlet />;
}
