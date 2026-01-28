import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authApi } from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [booting, setBooting] = useState(true); // app start

  const loadMe = async () => {
    try {
      const res = await authApi.me();
      setUser(res.data?.data?.user || null);
    } catch {
      setUser(null);
    } finally {
      setBooting(false);
    }
  };

  useEffect(() => {
    loadMe();
  }, []);

  const login = async ({ username, password, captchaToken }) => {
    await authApi.login({ username, password, captchaToken });
    await loadMe(); // login'dan keyin user ni olib kelamiz
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
