// src/pages/Login.jsx
import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import { alertSuccess, alertError } from '../lib/alert'

export default function Login(){
  const { loginEmail, loginGoogle } = useAuth()
  const nav = useNavigate()
  const loc = useLocation()
  const from = loc.state?.from?.pathname || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await loginEmail(email, password)
      await alertSuccess('Welcome back!')
      nav(from, { replace: true })
    } catch (e) {
      alertError('Login failed', e.message)
    }
  }

  const onGoogle = async () => {
    try {
      await loginGoogle()
      await alertSuccess('Logged in with Google')
      nav(from, { replace: true })
    } catch (e) {
      alertError('Google sign-in failed', e.message)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="input input-bordered w-full" placeholder="Email" type="email"
               value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input input-bordered w-full" placeholder="Password" type="password"
               value={password} onChange={e=>setPassword(e.target.value)} />
        <div className="text-right text-sm opacity-70">Forget Password (skip as per brief)</div>
        <button className="btn btn-primary w-full">Login</button>
        <button type="button" onClick={onGoogle} className="btn w-full">Continue with Google</button>
        <p className="text-sm">No account? <Link to="/register" className="underline">Register</Link></p>
      </form>
    </div>
  )
}
