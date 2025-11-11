// src/pages/Home.jsx
import { useQuery } from '@tanstack/react-query'
import { fetchVehicles } from '../api/vehicles'
import { formatDistanceToNow } from 'date-fns'
import HeroBooking from '../components/HeroBooking'
import { Link } from 'react-router-dom'

export default function Home(){
  const { data } = useQuery({
    queryKey:['latest'],
    queryFn: () => fetchVehicles({ sortBy:'createdAt', sortOrder:'desc', limit:6 })
  })

  return (
    <div className="space-y-10">
      <HeroBooking />

      <section>
        <h2 className="text-2xl font-bold mb-4">Latest Arrivals</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.items?.map(v => (
            <div key={v._id} className="card bg-base-200">
              <figure className="aspect-video"><img src={v.coverImage} alt={v.vehicleName} /></figure>
              <div className="card-body">
                <h3 className="card-title">{v.vehicleName}</h3>
                <p className="text-sm opacity-80">{v.location} • {v.category}</p>
                <p className="text-xs opacity-60">
                  added {formatDistanceToNow(new Date(v.createdAt||v.updatedAt||Date.now()))} ago
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-semibold">${v.pricePerDay}/day</span>
                  <Link className="btn btn-sm" to={`/vehicles/${v._id}`}>View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
