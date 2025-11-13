// src/pages/MyVehicles.jsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteVehicle, fetchVehicles } from '../api/vehicles'
import { useAuth } from "../context/AuthContext.js";
import { confirm as swalConfirm, alertError, alertSuccess } from '../lib/alert'
import { safeImg } from '../utils/images'
import Loader from '../components/Loader'

export default function MyVehicles() {
  const { user } = useAuth()
  const qc = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['myVehicles', user?.email],
    queryFn: () => fetchVehicles({ userEmail: user?.email }),
    enabled: !!user?.email,
  })

  const { mutateAsync: removeVehicle, isPending } = useMutation({
    mutationFn: deleteVehicle,
    onSuccess: async () => {
      await alertSuccess('Vehicle deleted')
      qc.invalidateQueries({ queryKey: ['myVehicles', user?.email] })
      qc.invalidateQueries({ queryKey: ['vehicles'] })
    },
    onError: (e) => alertError('Delete failed', e.message),
  })

  const handleDelete = async (id) => {
    const ans = await swalConfirm('Delete this vehicle?', 'This action cannot be undone.')
    if (ans.isConfirmed) await removeVehicle(id)
  }

  if (isLoading) return <Loader />
  if (error) return <div className="text-center py-10">Failed to load vehicles.</div>

  const list = data?.items || []

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Vehicles</h1>

      {isPending && <Loader />}

      {list.length === 0 && (
        <p className="text-sm opacity-70">You haven’t added any vehicles yet.</p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map(v => (
          <div key={v._id} className="card bg-base-200 h-full">
            <figure className="aspect-video">
              <img src={safeImg(v.coverImage)} alt={v.vehicleName} className="w-full h-full object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{v.vehicleName}</h3>
              <p className="text-sm opacity-80">{v.category} • {v.location}</p>
              <p className="text-sm">${v.pricePerDay}/day</p>
              <div className="mt-auto grid grid-cols-3 gap-2">
                <a href={`/vehicles/${v._id}`} className="btn-grad text-sm text-center">View</a>
                <a href={`/update-vehicle/${v._id}`} className="btn-grad-2 text-sm text-center">Update</a>
                <button onClick={() => handleDelete(v._id)} className="btn btn-sm btn-error">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
