// src/pages/AddVehicle.jsx
// src/pages/AddVehicle.jsx
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createVehicle } from '../api/vehicles'
import { useAuth } from "../context/AuthContext.js";
import { alertSuccess, alertError } from '../lib/alert'
import Loader from '../components/Loader'


export default function AddVehicle() {
  const { user } = useAuth()
  const qc = useQueryClient()

  const [form, setForm] = useState({
    vehicleName: '',
    owner: user?.displayName || '',
    category: 'Sedan',
    pricePerDay: '',
    location: '',
    availability: 'Available',
    description: '',
    coverImage: '',
    userEmail: user?.email || '',
  })

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createVehicle,
    onSuccess: async () => {
      await alertSuccess('Vehicle added successfully!')
      qc.invalidateQueries({ queryKey: ['vehicles'] })
      qc.invalidateQueries({ queryKey: ['myVehicles', user?.email] })
      setForm({
        vehicleName: '',
        owner: user?.displayName || '',
        category: 'Sedan',
        pricePerDay: '',
        location: '',
        availability: 'Available',
        description: '',
        coverImage: '',
        userEmail: user?.email || '',
      })
    },
    onError: (e) => alertError('Failed to add vehicle', e.message),
  })

  const onChange = (k, v) => setForm(s => ({ ...s, [k]: v }))

  const onSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      ...form,
      owner: form.owner || (user?.displayName ?? "Unknown"),
      userEmail: user?.email ?? "",
      pricePerDay: Number(form.pricePerDay) || 0,
    }

    try {
      await mutateAsync(payload)
    } catch (e) {
      const msg = e?.response?.data?.message || e.message || "Request failed"
      alertError("Failed to add vehicle", `${msg}`)
    }
  } // <-- ❗ properly close onSubmit function

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Vehicle</h1>

      {isPending && <Loader />}

      <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4">
        <input
          className="input input-bordered"
          placeholder="Vehicle Name"
          value={form.vehicleName}
          onChange={e => onChange('vehicleName', e.target.value)}
        />

        <input
          className="input input-bordered"
          placeholder="Owner Name"
          value={form.owner}
          onChange={e => onChange('owner', e.target.value)}
        />

        <select
          className="select select-bordered"
          value={form.category}
          onChange={e => onChange('category', e.target.value)}
        >
          <option>Sedan</option>
          <option>SUV</option>
          <option>Electric</option>
          <option>Van</option>
        </select>

        <input
          className="input input-bordered"
          placeholder="Price Per Day"
          value={form.pricePerDay}
          onChange={e => onChange('pricePerDay', e.target.value)}
        />

        <input
          className="input input-bordered"
          placeholder="Location"
          value={form.location}
          onChange={e => onChange('location', e.target.value)}
        />

        <select
          className="select select-bordered"
          value={form.availability}
          onChange={e => onChange('availability', e.target.value)}
        >
          <option>Available</option>
          <option>Booked</option>
        </select>

        <input
          className="input input-bordered md:col-span-2"
          placeholder="Cover Image URL"
          value={form.coverImage}
          onChange={e => onChange('coverImage', e.target.value)}
        />

        <input
          className="input input-bordered md:col-span-2"
          placeholder="User Email"
          value={form.userEmail}
          readOnly
        />

        <textarea
          className="textarea textarea-bordered md:col-span-2"
          placeholder="Description"
          value={form.description}
          onChange={e => onChange('description', e.target.value)}
        />

        <button className="btn btn-primary md:col-span-2" disabled={isPending}>
          {isPending ? 'Adding…' : 'Add Vehicle'}
        </button>
      </form>
    </div>
  )
}
