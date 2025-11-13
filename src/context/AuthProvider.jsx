import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext.jsx";
import { auth } from "../firebase/firebase.js"; 
import {
  onAuthStateChanged,
  onIdTokenChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setLoading(false);
    });
    return unsub;
  }, []);

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
      loginEmail: (email, password) =>
        signInWithEmailAndPassword(auth, email, password),
      registerEmail: async ({ name, email, password, photoURL }) => {
        const cred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(cred.user, {
          displayName: name || "",
          photoURL: photoURL || "",
        });
      },
      loginGoogle: () => signInWithPopup(auth, googleProvider),
      logout: () => signOut(auth),
    }),
    [user, loading, idToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
