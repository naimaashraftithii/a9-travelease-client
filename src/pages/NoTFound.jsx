import { Link } from 'react-router-dom'
export default function NotFound(){
  return (
    <div className="min-h-[50vh] grid place-items-center text-center">
      <div>
        <h1 className="text-4xl font-extrabold mb-2">404</h1>
        <p className="mb-3">We couldn’t find that page.</p>
        <Link to="/" className="underline">Go Home</Link>
      </div>
    </div>
  )
}
