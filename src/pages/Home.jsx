import { useEffect, useState } from 'react'
import http from '../api/http'
import HeroSlider from '../components/HeroSlider'

export default function Home(){
  const [status, setStatus] = useState('checking…')

  useEffect(() => {
    http.get('/')
      .then(() => setStatus('API OK'))
      .catch(() => setStatus('API ERROR'))
  }, [])

  return (
    <div className="space-y-10">
      <section className="text-center">
        <h1 className="text-4xl font-extrabold mb-2">Book, Ride, Repeat</h1>
        <p className="opacity-80">TravelEase – Vehicle Booking & Trip Management</p>
        <p className="text-xs opacity-60 mt-2">Server status: {status}</p>
      </section>

      {/* Carousel */}
      <HeroSlider />

      {/* placeholder sections */}
      <section>
        <h2 className="text-2xl font-bold mb-3">Latest Arrivals</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="h-48 bg-neutral/10 rounded-xl" />
          <div className="h-48 bg-neutral/10 rounded-xl" />
          <div className="h-48 bg-neutral/10 rounded-xl" />
        </div>
      </section>
    </div>
  )
}
