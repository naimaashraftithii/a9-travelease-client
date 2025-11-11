// src/components/Navbar.jsx
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useEffect, useState } from "react";
import { confirm, alertSuccess } from "../lib/alert";

const menuItems = [
  { to: "/", label: "Home" },
  { to: "/vehicles", label: "All Vehicles" },
  { to: "/add-vehicle", label: "Add Vehicle", private: true },
  { to: "/my-vehicles", label: "My Vehicles", private: true },
  { to: "/my-bookings", label: "My Bookings", private: true },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const navigate = useNavigate();

  useEffect(() => {
    const html = document.documentElement;
    theme === "dark" ? html.classList.add("dark") : html.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const onLogout = async () => {
    const ans = await confirm("Log out?", "You can log back in anytime.");
    if (!ans.isConfirmed) return;
    await logout();
    await alertSuccess("Logged out");
    navigate("/");
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2 font-extrabold text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="w-7 h-7 text-orange-500"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13l2-5a3 3 0 012.82-2h8.36A3 3 0 0119 8l2 5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 16h14" />
            <circle cx="7" cy="16" r="1.3" fill="currentColor" />
            <circle cx="17" cy="16" r="1.3" fill="currentColor" />
          </svg>
          <span className="select-none">
            <span className="text-orange-500">Travel</span>
            <span className="text-slate-800 dark:text-white">Ease</span>
          </span>
        </Link>

        {/* Center: Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6">
          {menuItems.map((item) => {
            if (item.private && !user) return null;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-orange-500 border-b-2 border-orange-500 pb-[2px]"
                      : "text-slate-700 dark:text-slate-200 hover:text-orange-500"
                  }`
                }
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Right: Theme + Auth (Desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            className="px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-slate-800"
            onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
            aria-label="Toggle theme"
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>

          {!user ? (
            <>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-md text-sm font-semibold hover:opacity-90"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md text-sm font-semibold hover:bg-orange-600"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="tooltip tooltip-bottom" data-tip={user.displayName || user.email}>
                <img
                  src={
                    user.photoURL ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || "U")}&background=111827&color=fff`
                  }
                  className="w-9 h-9 rounded-full ring-2 ring-gray-200 dark:ring-slate-700 object-cover"
                  alt="avatar"
                />
              </div>
              <button
                onClick={onLogout}
                className="px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                LogOut
              </button>
            </div>
          )}
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            className="px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-md text-sm font-medium"
            onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
            aria-label="Toggle theme"
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="p-2 border border-gray-300 dark:border-slate-700 rounded-md"
            aria-label="Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 shadow-sm px-4 py-3 space-y-2">
          {menuItems.map((item) => {
            if (item.private && !user) return null;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block text-sm font-medium ${
                    isActive ? "text-orange-500" : "text-slate-700 dark:text-slate-200 hover:text-orange-500"
                  }`
                }
              >
                {item.label}
              </NavLink>
            );
          })}

          {!user ? (
            <div className="flex gap-2 pt-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-slate-900 text-white text-center py-2 rounded-md font-semibold"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-orange-500 text-white text-center py-2 rounded-md font-semibold"
              >
                Register
              </Link>
            </div>
          ) : (
            <button
              onClick={async () => {
                setIsOpen(false);
                await onLogout();
              }}
              className="w-full border border-gray-300 dark:border-slate-700 py-2 rounded-md font-medium mt-2"
            >
              LogOut
            </button>
          )}
        </div>
      )}
    </header>
  );
}
