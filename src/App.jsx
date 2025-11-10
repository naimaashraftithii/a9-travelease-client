import { Routes, Route, Link, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b">
        <div className="container mx-auto px-4 h-14 flex items-center gap-4">
          <Link to="/" className="font-bold">TravelEasy</Link>
          <NavLink to="/" className="text-sm">Home</NavLink>
        </div>
      </nav>

      <main className="flex-1 container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 py-6 text-sm flex justify-between">
          <span>© {new Date().getFullYear()} TravelEasy</span>
          <span>Follow us: ✖ / ig / f</span>
        </div>
      </footer>
    </div>
  )
}
