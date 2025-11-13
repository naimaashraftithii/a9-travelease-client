import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { loginEmail, loginGoogle } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Email + Password Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginEmail(form.email, form.password);
      toast.success("Logged in successfully!");
      // 💡 requirement: go to Home
      navigate("/", { replace: true });
    } catch {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await loginGoogle();
      const user = result.user;

      // Optional: Save user to backend
      fetch(`${import.meta.env.VITE_API_BASE}/users`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        }),
      }).catch(() => {});

      toast.success(`Welcome ${user.displayName || "back"}!`);
      // 💡 requirement: go to Home after Google login
      navigate("/", { replace: true });
    } catch {
      toast.error("Google login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-pink-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-6">
          User{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">
            Login
          </span>
        </h2>

        {/* Email / Password Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
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
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-10"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-slate-500 hover:text-indigo-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg font-semibold hover:from-pink-500 hover:to-indigo-500 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-6 flex items-center justify-center gap-2">
          <div className="h-px bg-slate-200 w-1/3"></div>
          <span className="text-sm text-slate-400">OR</span>
          <div className="h-px bg-slate-200 w-1/3"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full text-slate-700 flex items-center justify-center gap-2 border border-slate-300 rounded-lg py-2 hover:bg-slate-50 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <FaGoogle className="text-red-500" /> Continue with Google
        </button>

        <p className="text-center text-sm text-slate-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
