// src/pages/MyVehicles.jsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteVehicle, fetchVehicles } from '../api/vehicles'
import { useAuth } from '../context/AuthProvider'
import toast from 'react-hot-toast'

export default function MyVehicles() {
  const { user } = useAuth()
  const qc = useQueryClient()

  // get all vehicles owned by this user
  const { data, isLoading } = useQuery({
    queryKey: ['myVehicles', user?.email],
    queryFn: () => fetchVehicles({ userEmail: user?.email }),
    enabled: !!user?.email,
  })

  const { mutateAsync: removeVehicle } = useMutation({
    mutationFn: deleteVehicle,
    onSuccess: () => qc.invalidateQueries(['myVehicles']),
  })

  if (isLoading) return <div className="text-center py-10">Loading...</div>
  const list = data?.items || []

  const handleDelete = async id => {
    if (!confirm('Delete this vehicle?')) return
    try {
      await removeVehicle(id)
      toast.success('Vehicle deleted')
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Vehicles</h1>

      {list.length === 0 && (
        <p className="text-sm opacity-70">You haven’t added any vehicles yet.</p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map(v => (
          <div key={v._id} className="card bg-base-200 h-full">
            <figure className="aspect-video">
              <img src={v.coverImage} alt={v.vehicleName} className="w-full h-full object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{v.vehicleName}</h3>
              <p className="text-sm opacity-80">{v.category} • {v.location}</p>
              <p className="text-sm">${v.pricePerDay}/day</p>
              <div className="mt-auto flex justify-between">
                <a href={`/update-vehicle/${v._id}`} className="btn btn-sm btn-primary">Edit</a>
                <button onClick={() => handleDelete(v._id)} className="btn btn-sm btn-error">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
