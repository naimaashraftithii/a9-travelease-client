/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useSpring, animated, to as springTo } from "@react-spring/web";
import Swal from "sweetalert2";
import { parse, format, isBefore, isValid, differenceInCalendarDays } from "date-fns";

// ✅ FIXED: correct i.ibb.co domain and keep only ONE constant and NO stray URLs below it
const CAR_IMG = "https://i.ibb.co/jPyZS1qS/ff2dbc0d6e519913771b5450b6304c22.jpg";

export default function HeroBooking() {
  // ---------- react-spring parallax for the car ----------
  const wrapRef = useRef(null);
  const [{ x, y, r }, api] = useSpring(() => ({ x: 0, y: 0, r: 0 }));

  const onMouseMove = (e) => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
    const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
    api.start({ x: dx * 12, y: dy * 10, r: dx * 4 });
  };
  const onLeave = () => api.start({ x: 0, y: 0, r: 0 });

  // ---------- form state ----------
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const submit = (e) => {
    e.preventDefault();

    // expecting dd/MM/yyyy
    const parsed = parse(date, "dd/MM/yyyy", new Date());

    if (!name.trim() || !location.trim() || !date.trim()) {
      Swal.fire({ icon: "error", title: "Fill all fields" });
      return;
    }
    if (!isValid(parsed)) {
      Swal.fire({ icon: "error", title: "Invalid date format", text: "Use dd/mm/yyyy" });
      return;
    }

    const today = new Date();
    const midnightToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const isPast = isBefore(parsed, midnightToday);
    if (isPast) {
      Swal.fire({ icon: "warning", title: "Pick a future date" });
      return;
    }

    const daysFromNow = differenceInCalendarDays(parsed, today);

    Swal.fire({
      icon: "success",
      title: "Request received",
      html: `
        <div style="text-align:left">
          <div><b>Name:</b> ${name}</div>
          <div><b>Location:</b> ${location}</div>
          <div><b>Date:</b> ${format(parsed, "PPPP")}</div>
          <div style="opacity:.8;margin-top:.25rem">(${daysFromNow} day(s) from today)</div>
        </div>
      `,
      confirmButtonColor: "#f97316",
    });

    setName("");
    setLocation("");
    setDate("");
  };

  return (
    <section className="bg-[#fbfbf8] dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
        {/* Left copy */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-sm font-medium text-orange-600"
          >
            Rent with TravelEasy for Unmatched Convenience!
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mt-2 text-4xl md:text-6xl font-extrabold leading-tight text-slate-900 dark:text-white"
          >
            Effortless Travel
            <br /> Starts Here
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-4 text-slate-600 dark:text-slate-300 max-w-xl"
          >
            Book cars in seconds. Transparent pricing, flexible scheduling, and a modern fleet ready for any trip.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.45 }}
            className="mt-6 flex gap-3"
          >
            <a
              href="#book"
              className="px-5 py-3 rounded-lg font-semibold text-white bg-orange-600 hover:bg-orange-700 transition"
            >
              Book a Car
            </a>
            <a
              href="/vehicles"
              className="px-5 py-3 rounded-lg font-semibold border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 transition"
            >
              Learn More
            </a>
          </motion.div>
        </div>

        {/* Right: image with spring parallax */}
        <div
          ref={wrapRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onLeave}
          className="relative"
        >
          <animated.img
            src={CAR_IMG}
            alt="Car"
            className="w-full max-w-xl mx-auto drop-shadow-xl will-change-transform"
            style={{
              transform: springTo([x, y, r], (vx, vy, vr) =>
                `translate3d(${vx}px, ${vy}px, 0) rotate(${vr}deg)`
              ),
            }}
          />

          {/* Floating spec card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="absolute right-2 md:right-6 bottom-6 bg-white/90 backdrop-blur rounded-md shadow p-4 text-sm w-64"
          >
            <div className="font-semibold">Audi A4</div>
            <div className="mt-1 text-slate-600">
              Type: Luxury Sedan • Seats: 5
              <br /> Engine: 2.0L Turbo I4
            </div>
          </motion.div>
        </div>
      </div>

      {/* Booking bar */}
      <div id="book" className="max-w-7xl mx-auto px-4 pb-14">
        <div className="bg-[#121212] text-white rounded-2xl px-5 py-6 md:px-8 md:py-8 shadow-xl">
          <form onSubmit={submit} className="grid md:grid-cols-[1fr_1fr_1fr_auto] gap-4 items-end">
            <div>
              <label className="block text-sm mb-2 opacity-80">Name*</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/15 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-2 opacity-80">Pick up Location*</label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/15 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-2 opacity-80">Date* (dd/mm/yyyy)</label>
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="dd/mm/yyyy"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/15 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button className="h-[48px] md:h-[50px] px-6 rounded-lg font-semibold bg-orange-600 hover:bg-orange-700 transition">
              Book a Car
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
