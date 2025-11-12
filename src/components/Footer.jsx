import { useId, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../assets/logo2.png";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState("");
  const gradId = useId();

  const onSubscribe = (e) => {
    e.preventDefault();
    const ok = /^\S+@\S+\.\S+$/.test(email);
    if (!ok) {
      Swal.fire({
        icon: "error",
        title: "Invalid email",
        text: "Please enter a valid email address.",
        confirmButtonText: "Try again",
        confirmButtonColor: "#ef4444",
      });
      return;
    }
    Swal.fire({
      icon: "success",
      title: "Subscribed!",
      text: "You’ve been added to our newsletter 🎉",
      confirmButtonText: "Great",
      confirmButtonColor: "#f97316",
    }).then(() => setEmail(""));
  };

  return (
    <footer className="bg-[#0f0f0f] text-gray-300 pt-16 pb-8">
      {/* ✅ Subscribe Box */}
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl font-semibold">Subscribe Our Newsletter</h2>

        <form
          onSubmit={onSubscribe}
          className="mt-5 flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email Address"
            className="flex-1 py-3 px-4 rounded-lg bg-white/10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 transition text-white font-semibold py-3 px-6 rounded-lg"
          >
            Subscribe
          </button>
        </form>

        <hr className="mt-8 border-gray-700" />
      </div>

      {/* ✅ Footer Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* ✅ Logo & About Section */}
        <div>
          <div className="shrink-0">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src={logo}
                alt="Logo"
                className="w-10 h-10 object-contain"
                loading="eager"
              />

              <div className="relative leading-none select-none">
                <span
                  className="text-lg md:text-xl italic font-black text-slate-100  decoration-2 underline-offset-[6px]"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    textDecorationColor: "#fb923c",
                  }}
                >
                  Travel
                </span>
                <span
                  className="ml-1 text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-amber-400 to-rose-400"
                  style={{ fontFamily: "'Pacifico', cursive" }}
                >
                  Easy
                </span>

                {/* Painted underline */}
                <svg
                  viewBox="0 0 200 20"
                  className="absolute left-0 bottom-[-6px] w-[140px] h-[14px] pointer-events-none"
                >
                  <defs>
                    <linearGradient id={gradId} x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0%" stopColor="#fb923c" />
                      <stop offset="50%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#dc2626" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M5 15 Q 80 2, 195 10"
                    fill="none"
                    stroke={`url(#${gradId})`}
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </Link>
          </div>

          <p className="mt-5 text-sm text-gray-400 leading-relaxed">
            Explore the world with comfort, convenience, and confidence. We
            provide modern solutions for all types of travelers.
          </p>
        </div>

        {/* ✅ Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-orange-400">Quick Links</h3>
          <ul className="mt-4 space-y-2">
            {["Homepage", "About Us", "Mentors", "Services"].map((item) => (
              <li key={item}>
                <Link
                  to="/"
                  className="hover:text-orange-400 transition text-sm"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ✅ Services */}
        <div>
          <h3 className="text-lg font-semibold text-orange-400">Services</h3>
          <ul className="mt-4 space-y-2">
            {[
              "Business Rental",
              "Airport Transfer",
              "Travel Rental",
              "Luxury Rental",
            ].map((item) => (
              <li key={item} className="text-sm hover:text-orange-400 transition">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ✅ Contact Info */}
        <div className="flex flex-col items-start lg:items-end">
          <h3 className="text-lg font-semibold text-orange-400">Contact Us</h3>
          <p className="mt-4 text-sm">KLLG st.No 99 PKU City</p>
          <p className="text-sm mt-2">+62 761-8523-398</p>
          <a
            href="#"
            className="text-sm mt-2 block hover:text-orange-400 transition"
          >
            www.traveleasy.com
          </a>
        </div>
      </div>

      {/* ✅ Bottom Bar — Centered Column with Social Icons */}
      <hr className="mt-12 border-gray-700" />
      <div className="max-w-6xl mx-auto px-4 mt-8 text-center flex flex-col items-center gap-4">
        {/* Social Icons */}
        <div className="flex gap-4 text-xl justify-center">
          {[FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaLinkedinIn].map(
            (Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social link"
                className="p-[10px] rounded-full bg-gradient-to-br from-pink-500 via-fuchsia-500 to-blue-500
                           text-white shadow-lg transition-all
                           hover:scale-110 hover:shadow-pink-500/40 hover:brightness-110"
              >
                <Icon />
              </a>
            )
          )}
        </div>

        {/* Copyright Text */}
        <p className="text-sm text-gray-500 mt-2">
          © {new Date().getFullYear()} <span className="text-orange-400">TravelEasy</span>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
