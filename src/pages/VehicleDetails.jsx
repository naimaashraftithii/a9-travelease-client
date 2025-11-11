// src/pages/VehicleDetails.jsx
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import { fetchVehicle } from '../api/vehicles'
import { createBooking } from '../api/bookings'
import { alertSuccess, alertError } from '../lib/alert'

export default function VehicleDetails(){
  const { id } = useParams()
  const { data, isLoading, error } = useQuery({
    queryKey:['vehicle', id],
    queryFn: () => fetchVehicle(id),
  })
  const { mutateAsync, isPending } = useMutation({ mutationFn: createBooking })

  if (isLoading) return <div className="py-10 text-center">Loading…</div>
  if (error || !data) return <div className="py-10 text-center">Failed to load vehicle.</div>

  const v = data

  const book = async () => {
    try {
      await mutateAsync({ vehicleId: v._id, status:'Interested' })
      await alertSuccess('Saved your interest!')
    } catch(e) {
      alertError('Booking failed', e.message)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <img className="w-full rounded-xl" src={v.coverImage} alt={v.vehicleName} />
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{v.vehicleName}</h1>
        <p>{v.description}</p>
        <p><b>Category:</b> {v.category} • <b>Location:</b> {v.location}</p>
        <p><b>Owner:</b> {v.owner} • <b>Price:</b> ${v.pricePerDay}/day</p>
        <button className="btn btn-primary" onClick={book} disabled={isPending}>
          {isPending ? 'Saving…' : 'Book Now'}
        </button>
      </div>
    </div>
  )
}
