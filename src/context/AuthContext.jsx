import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axiosClient from "../api/axiosClient";
import { authApi } from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [booting, setBooting] = useState(true);

  // 1) CSRF init (cookie auth uchun must)
  const initCsrf = async () => {
    try {
      await axiosClient.get("/auth/csrf");
    } catch {
      // CSRF fail bo‘lsa ham app yiqilmasin
    }
  };

  // 2) me
  const loadMe = async () => {
    try {
      const res = await authApi.me();
      setUser(res.data?.data?.user || null);
    } catch {
      setUser(null);
    }
  };

  // 3) App start bootstrap: csrf -> me
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        await initCsrf();
        if (!alive) return;

        await loadMe();
        if (!alive) return;
      } finally {
        if (alive) setBooting(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  // 4) actions
  const login = async ({ username, password, captchaToken }) => {
    await authApi.login({ username, password, captchaToken });
    await loadMe();
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
    }
  };

  const value = useMemo(
    () => ({
      user,
      isAuthed: !!user,
      booting,
      login,
      logout,
      refetch: loadMe,
    }),
    [user, booting],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
