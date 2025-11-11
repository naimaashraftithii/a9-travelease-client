// src/pages/MyBookings.jsx
import { useQuery } from '@tanstack/react-query'
import { myBookings } from '../api/bookings'
import toast from 'react-hot-toast'

export default function MyBookings() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['myBookings'],
    queryFn: myBookings,
  })

  if (isLoading) return <div className="text-center py-10">Loading...</div>
  if (error) {
    toast.error(error.message)
    return <div className="text-center py-10">Error loading bookings</div>
  }

  const list = data || []

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>

      {list.length === 0 && (
        <p className="text-sm opacity-70">No bookings found yet.</p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map(b => (
          <div key={b._id} className="card bg-base-200 h-full">
            <figure className="aspect-video">
              <img
                src={b.vehicle?.coverImage}
                alt={b.vehicle?.vehicleName}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{b.vehicle?.vehicleName}</h3>
              <p className="text-sm opacity-80">{b.vehicle?.category}</p>
              <p className="text-sm opacity-70">Location: {b.vehicle?.location}</p>
              <p className="text-sm font-semibold text-primary">
                Status: {b.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
