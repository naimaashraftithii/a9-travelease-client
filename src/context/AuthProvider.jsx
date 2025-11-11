import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const AuthCtx = createContext(undefined);

// Safer hook: throws a clear error if provider is missing
export const useAuth = () => {
  const ctx = useContext(AuthCtx);
  if (ctx === undefined) {
    throw new Error("useAuth must be used within <AuthProvider>");
  }
  return ctx;
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(
    () =>
      onAuthStateChanged(auth, (u) => {
        setUser(u);
        setLoading(false);
      }),
    []
  );

  const loginEmail = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const registerEmail = async ({ name, email, password, photoURL }) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name, photoURL });
  };

  const loginGoogle = () => signInWithPopup(auth, googleProvider);
  const logout = () => signOut(auth);

  const value = { user, loading, loginEmail, registerEmail, loginGoogle, logout };

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
