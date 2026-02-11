import { createContext, useEffect, useMemo, useState } from "react";
import { authApi } from "../api/authApi";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [booting, setBooting] = useState(true);

  const loadMe = async () => {
    try {
      const res = await authApi.me();
      setUser(res.data?.data?.user || null);
      return true;
    } catch {
      setUser(null);
      return false;
    }
  };

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        // 1) csrf cookie
        try {
          await authApi.csrf();
        } catch {}

        if (!alive) return;

        // 2) me
        await loadMe();
      } finally {
        if (alive) setBooting(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const login = async ({ username, password, captchaToken }) => {
    await authApi.login({ username, password, captchaToken });

    // ✅ login 200 bo‘ldi degani auth ishladi degani emas — me bilan tekshiramiz
    const ok = await loadMe();
    if (!ok)
      throw new Error(
        "Login 200 bo‘ldi, lekin sessiya ochilmadi (cookie/protect muammo).",
      );
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
