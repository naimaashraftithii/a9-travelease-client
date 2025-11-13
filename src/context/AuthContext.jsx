// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Optional: load user from localStorage (simple fake auth)
  useEffect(() => {
    const stored = localStorage.getItem("te_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("te_user");
      }
    }
  }, []);

  const login = async (email, _password) => {
    // TODO: replace with real Firebase login
    const fakeUser = { email };
    setUser(fakeUser);
    localStorage.setItem("te_user", JSON.stringify(fakeUser));
    return fakeUser;
  };

  const loginWithGoogle = async () => {
    // TODO: replace with real Google login
    const fakeUser = { email: "google.user@example.com", provider: "google" };
    setUser(fakeUser);
    localStorage.setItem("te_user", JSON.stringify(fakeUser));
    return fakeUser;
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("te_user");
  };

  const value = {
    user,
    loading,
    login,
    loginWithGoogle,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
