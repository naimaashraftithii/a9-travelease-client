
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { confirm, alertSuccess } from "../lib/alert";
import logoImg from "../assets/logo2.png";

const menuItems = [
  { to: "/", label: "Home" },
  { to: "/allVehicles", label: "All Vehicles" },    
  { to: "/addVehicle", label: "Add Vehicle", private: true },
  { to: "/myVehicles", label: "My Vehicles", private: true },
  { to: "/myBookings", label: "My Bookings", private: true },
];

const btn = (cls = "") =>
  `px-4 py-2 rounded-md text-sm font-semibold shadow transition-all ${cls}`;

export default function Navbar() {
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [isOpen, setIsOpen] = useState(false);
  const [imgOk, setImgOk] = useState(true);
  const navigate = useNavigate();

 
  useEffect(() => {
    const html = document.documentElement;

    if (theme === "dark") {
      html.classList.add("dark");
      html.setAttribute("data-theme", "dark");
    } else {
      html.classList.remove("dark");
      html.setAttribute("data-theme", "light");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const onLogout = async () => {
    const ans = await confirm("Log out?", "You can log back in anytime.");
    if (!ans.isConfirmed) return;
    await logout();
    await alertSuccess("Logged out");
    navigate("/");
  };

  const toggleTheme = () =>
    setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 h-16 grid grid-cols-12 items-center gap-4">
        {/* LEFT: logo */}
        <div className="col-span-5 sm:col-span-4 lg:col-span-3">
          <Link to="/" className="flex items-center gap-2 relative group">
            {imgOk ? (
              <img
                src={logoImg}
                alt="Logo"
                className="w-8 h-8 object-contain"
                onError={() => setImgOk(false)}
              />
            ) : (
              <div className="w-8 h-8 rounded bg-orange-500 grid place-items-center text-white font-bold">
                T
              </div>
            )}

            <div className="relative leading-none select-none">
              <span
                className="text-lg md:text-xl italic font-black text-slate-100"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Travel
              </span>
              <span
                className="ml-1 text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-amber-400 to-rose-400"
                style={{ fontFamily: "'Pacifico', cursive" }}
              >
                Easy
              </span>

              <svg
                viewBox="0 0 200 20"
                className="absolute left-0 bottom-[-6px] w-full h-[14px] pointer-events-none"
              >
                <path
                  d="M5 15 Q 80 2, 195 10"
                  fill="none"
                  stroke="url(#grad)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  style={{
                    filter:
                      "drop-shadow(0 0 4px rgba(255,140,0,0.6)) drop-shadow(0 0 10px rgba(255,80,0,0.3))",
                  }}
                />
                <defs>
                  <linearGradient id="grad" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#fb923c" />
                    <stop offset="50%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </Link>
        </div>

        {/*  desktop menu */}
        <nav className="col-span-2 lg:col-span-6 hidden lg:flex items-center justify-center gap-8">
          {menuItems.map((item) => {
            if (item.private && !user) return null;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative text-sm font-semibold transition-colors ${
                    isActive ? "text-orange-400" : "text-slate-300 hover:text-orange-300"
                  }`
                }
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Tdesktop controls*/}
        <div className="col-span-7 sm:col-span-8 lg:col-span-3 hidden md:flex items-center justify-end gap-3">
          {user ? (
            <>
              <img
                src={
                  user.photoURL ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.displayName || "U"
                  )}&background=0f172a&color=fff`
                }
                alt="avatar"
                className="w-9 h-9 rounded-full ring-2 ring-slate-700 object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={onLogout}
                className={btn(
                  "text-white bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 hover:from-amber-500 hover:to-rose-500"
                )}
              >
                LogOut
              </button>
              <button
                onClick={toggleTheme}
                className={btn(
                  theme === "dark"
                    ? "text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500"
                    : "text-slate-900 bg-gradient-to-r from-sky-300 to-indigo-300 hover:from-indigo-300 hover:to-sky-300"
                )}
              >
                {theme === "dark" ? "Dark → Light" : "Light → Dark"}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={btn(
                  "text-white bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-800"
                )}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={btn(
                  "text-white bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 hover:from-red-500 hover:to-orange-500"
                )}
              >
                Register
              </Link>
              <button
                onClick={toggleTheme}
                className={btn(
                  theme === "dark"
                    ? "text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500"
                    : "text-slate-900 bg-gradient-to-r from-sky-300 to-indigo-300 hover:from-indigo-300 hover:to-sky-300"
                )}
              >
                {theme === "dark" ? "Dark → Light" : "Light → Dark"}
              </button>
            </>
          )}
        </div>

        {/* Mobile  */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="md:hidden col-span-7 sm:col-span-8 justify-self-end p-2 rounded-md text-white bg-gradient-to-r from-orange-500 to-pink-500 shadow"
          aria-label="Menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile panel */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 py-3 space-y-3 shadow">
          {menuItems.map((item) => {
            if (item.private && !user) return null;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block text-sm font-semibold ${
                    isActive ? "text-orange-400" : "text-slate-300 hover:text-orange-300"
                  }`
                }
              >
                {item.label}
              </NavLink>
            );
          })}
          <div className="pt-2 flex gap-2">
            // pseudo-example
{user ? (
  <button onClick={logout} className="btn btn-sm">Logout</button>
) : (
  <Link to="/login" className="btn btn-sm btn-primary">
    Login
  </Link>
)}

            {user ? (
              <>
                <button
                  onClick={async () => {
                    await onLogout();
                    setIsOpen(false);
                  }}
                  className={btn(
                    "flex-1 text-white bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 hover:from-amber-500 hover:to-rose-500 text-center"
                  )}
                >
                  LogOut
                </button>
                <button
                  onClick={() => {
                    toggleTheme();
                    setIsOpen(false);
                  }}
                  className={btn(
                    (theme === "dark"
                      ? "text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 "
                      : "text-slate-900 bg-gradient-to-r from-sky-300 to-indigo-300 hover:from-indigo-300 hover:to-sky-300 ") +
                      "flex-1"
                  )}
                >
                  {theme === "dark" ? "Dark → Light" : "Light → Dark"}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className={btn(
                    "flex-1 text-white bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-center"
                  )}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className={btn(
                    "flex-1 text-white bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 hover:from-red-500 hover:to-orange-500 text-center"
                  )}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
