import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

export default function RequireAuth() {
  const location = useLocation();
  const [booting, setBooting] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    let alive = true;

    const check = async () => {
      try {
        // ✅ cookie bor bo‘lsa 200 qaytaradi
        await axiosClient.get("/auth/me");
        if (alive) setIsAuthed(true);
      } catch {
        if (alive) setIsAuthed(false);
      } finally {
        if (alive) setBooting(false);
      }
    };

    check();
    return () => {
      alive = false;
    };
  }, []);

  if (booting) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  if (!isAuthed) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
