// src/context/AuthContext.js
import { createContext, useContext } from "react";

/** Global auth context object */
export const AuthCtx = createContext(null);

/** Hook to access auth state/actions anywhere */
export function useAuth() {
  const v = useContext(AuthCtx);
  if (!v) throw new Error("useAuth must be used within <AuthProvider>");
  return v;
}
