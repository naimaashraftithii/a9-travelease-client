// src/context/AuthProvider.jsx
import { useEffect, useMemo, useState } from "react";
import { AuthCtx } from "./AuthContext.js";
import { auth, googleProvider } from "../firebase/firebase";
import {
  onAuthStateChanged,
  onIdTokenChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  signOut,
} from "firebase/auth";

/** Default export ONLY — keeps react-refresh happy */
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // track signed-in user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setLoading(false);
    });
    return unsub;
  }, []);

  // keep fresh ID token for APIs (also saved to localStorage)
  useEffect(() => {
    const unsub = onIdTokenChanged(auth, async (u) => {
      if (!u) {
        setIdToken(null);
        localStorage.removeItem("idToken");
        return;
      }
      const t = await u.getIdToken(false);
      setIdToken(t);
      localStorage.setItem("idToken", t);
    });
    return unsub;
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      idToken,

      // email/password login
      loginEmail: (email, password) =>
        signInWithEmailAndPassword(auth, email, password),

      // email/password registration
      registerEmail: async ({ name, email, password, photoURL }) => {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name || "", photoURL: photoURL || "" });
      },

      // Google popup
      loginGoogle: () => signInWithPopup(auth, googleProvider),

      // logout
      logout: () => signOut(auth),
    }),
    [user, loading, idToken]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
