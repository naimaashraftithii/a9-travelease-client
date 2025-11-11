// src/pages/Register.jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import { alertSuccess, alertError } from '../lib/alert'

const valid = (p) => /[A-Z]/.test(p) && /[a-z]/.test(p) && p.length >= 6

export default function Register(){
  const nav = useNavigate()
  const { registerEmail } = useAuth()
  const [form, setForm] = useState({ name:'', email:'', photoURL:'', password:'' })
  const [err, setErr] = useState('')

  const onChange = (k, v) => setForm(s => ({ ...s, [k]: v }))
  const onSubmit = async (e) => {
    e.preventDefault()
    if (!valid(form.password)) { setErr('Password must be 6+ chars & include uppercase + lowercase'); return }
    try {
      await registerEmail(form)
      await alertSuccess('Account created')
      nav('/')
    } catch (e) { alertError('Registration failed', e.message) }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Register</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="input input-bordered w-full" placeholder="Name"
               value={form.name} onChange={e=>onChange('name', e.target.value)} />
        <input className="input input-bordered w-full" placeholder="Email" type="email"
               value={form.email} onChange={e=>onChange('email', e.target.value)} />
        <input className="input input-bordered w-full" placeholder="Photo URL"
               value={form.photoURL} onChange={e=>onChange('photoURL', e.target.value)} />
        <input className="input input-bordered w-full" placeholder="Password" type="password"
               value={form.password} onChange={e=>onChange('password', e.target.value)} />
        {err && <p className="text-error text-sm">{err}</p>}
        <button className="btn btn-primary w-full">Register</button>
        <p className="text-sm">Have an account? <Link to="/login" className="underline">Login</Link></p>
      </form>
    </div>
  )
}
