/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import { auth, googleProvider } from "../firebase/firebase"
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  signOut,
} from 'firebase/auth'


const Ctx = createContext(null)
export const useAuth = () => useContext(Ctx)

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => onAuthStateChanged(auth, u => { setUser(u); setLoading(false) }), [])

  const loginEmail = (email, password) => signInWithEmailAndPassword(auth, email, password)
  const registerEmail = async ({ name, email, password, photoURL }) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(cred.user, { displayName: name, photoURL })
  }
  const loginGoogle = () => signInWithPopup(auth, googleProvider)
  const logout = () => signOut(auth)

  return (
    <Ctx.Provider value={{ user, loading, loginEmail, registerEmail, loginGoogle, logout }}>
      {children}
    </Ctx.Provider>
  )
}
