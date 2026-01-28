import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminGuard() {
  const { booting, isAuthed } = useAuth();

  if (booting) return <div style={{ padding: 20 }}>Loading...</div>;

  if (!isAuthed) return <Navigate to="/login" replace />;

  return <Outlet />;
}
