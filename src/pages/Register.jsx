import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { registerEmail, loginGoogle } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [passError, setPassError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validatePassword = (pwd) => {
    if (pwd.length < 6) return "Password must be at least 6 characters.";
    if (!/[A-Z]/.test(pwd)) return "Password must contain one uppercase letter.";
    if (!/[a-z]/.test(pwd)) return "Password must contain one lowercase letter.";
    return "";
  };

  const saveUser = async (user) => {
    try {
      const newUser = {
        name: user.displayName || form.name,
        email: user.email,
        image: user.photoURL || form.photoURL,
      };
      await fetch(`${import.meta.env.VITE_API_BASE}/users`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newUser),
      });
    } catch {
      // ignore backend save error
    }
  };

  // Register with Email
  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validatePassword(form.password);
    if (err) {
      setPassError(err);
      return;
    }
    setPassError("");
    setLoading(true);
    try {
      await registerEmail({
        name: form.name,
        email: form.email,
        password: form.password,
        photoURL: form.photoURL,
      });
      await saveUser({
        displayName: form.name,
        email: form.email,
        photoURL: form.photoURL,
      });
      toast.success("Registration successful!");
      navigate("/", { replace: true });
    } catch {
      toast.error("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogle = async () => {
    setLoading(true);
    try {
      const result = await loginGoogle();
      await saveUser(result.user);
      toast.success(`Welcome ${result.user.displayName || "!"}`);
      navigate("/", { replace: true }); // go Home
    } catch {
      toast.error("Google login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-emerald-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-6">
          User{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500">
            Registration
          </span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="Your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Photo URL
            </label>
            <input
              type="url"
              name="photoURL"
              value={form.photoURL}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="https://example.com/me.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="Create a strong password"
            />
            {passError && (
              <p className="text-xs text-red-500 mt-1">{passError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gradient-to-r from-sky-500 to-emerald-500 text-white rounded-lg font-semibold hover:from-emerald-500 hover:to-sky-500 transition disabled:opacity-70"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <div className="my-6 flex items-center justify-center gap-2">
          <div className="h-px bg-slate-200 w-1/3"></div>
          <span className="text-sm text-slate-400">OR</span>
          <div className="h-px bg-slate-200 w-1/3"></div>
        </div>

        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 border border-slate-300 rounded-lg py-2 text-slate-700 hover:bg-slate-50 transition disabled:opacity-70"
        >
          <FaGoogle className="text-red-500" /> Continue with Google
        </button>

        <p className="text-center text-sm text-slate-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
