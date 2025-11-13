import { useEffect, useState } from "react";
import { AuthCtx } from "./AuthContext.js";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

const provider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(
    () =>
      onAuthStateChanged(auth, (u) => {
        setUser(u || null);
        setLoading(false);
      }),
    []
  );

  const loginGoogle = () => signInWithPopup(auth, provider);
  const loginEmail = (email, pw) =>
    signInWithEmailAndPassword(auth, email, pw);
  const registerEmail = async ({ name, email, password, photoURL }) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name, photoURL });
  };
  const logout = () => signOut(auth);

  return (
    <AuthCtx.Provider value={{ user, loading, loginGoogle, loginEmail, registerEmail, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
