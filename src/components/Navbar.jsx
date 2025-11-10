import { Link, NavLink } from "react-router-dom"

export default function Navbar(){
  return (
    <div className="border-b">
      <div className="navbar container mx-auto px-4">
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold">TravelEase</Link>
        </div>
        <ul className="menu menu-horizontal px-1 gap-2">
          <li><NavLink to="/">Home</NavLink></li>
        </ul>
      </div>
    </div>
  )
}
