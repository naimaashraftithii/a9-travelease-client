import { createContext, useContext } from "react";

export const AuthCtx = createContext(null);
export const useAuth = () => {
  const c = useContext(AuthCtx);
  if (!c) throw new Error("useAuth must be inside <AuthProvider>");
  return c;
};
