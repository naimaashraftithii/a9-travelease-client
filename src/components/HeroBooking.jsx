// src/components/HeroBooking.jsx
import { useState, useRef } from "react";
import { motion } from "framer-motion";               
import { useSpring, animated, to as springTo } from "@react-spring/web";
import Swal from "sweetalert2";
import {
  parse,
  format,
  isBefore,
  isValid,
  differenceInCalendarDays,
} from "date-fns";

const CAR_IMG =
  "https://i.ibb.co/jPyZS1qS/ff2dbc0d6e519913771b5450b6304c22.jpg";

// Framer-motion variants
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

const primaryBtnVariants = {
  initial: { scale: 1, y: 0, boxShadow: "0 0 0 rgba(0,0,0,0)" },
  hover: {
    scale: 1.04,
    y: -1,
    boxShadow: "0 18px 40px rgba(249,115,22,0.35)",
  },
  tap: { scale: 0.97, y: 0 },
};

const ghostBtnVariants = {
  initial: { scale: 1, y: 0 },
  hover: {
    scale: 1.03,
    y: -1,
    backgroundColor: "rgba(15,23,42,0.04)",
  },
  tap: { scale: 0.97, y: 0 },
};

export default function HeroBooking() {
  const wrapRef = useRef(null);
  const [{ x, y, r }, api] = useSpring(() => ({ x: 0, y: 0, r: 0 }));

  const onMouseMove = (e) => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
    const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
    api.start({ x: dx * 14, y: dy * 10, r: dx * 5 });
  };
  const onLeave = () => api.start({ x: 0, y: 0, r: 0 });

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const parsed = parse(date, "dd/MM/yyyy", new Date());

    if (!name.trim() || !location.trim() || !date.trim()) {
      Swal.fire({ icon: "error", title: "Fill all fields" });
      return;
    }
    if (!isValid(parsed)) {
      Swal.fire({
        icon: "error",
        title: "Invalid date format",
        text: "Use dd/mm/yyyy",
      });
      return;
    }

    const today = new Date();
    const midnight = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    if (isBefore(parsed, midnight)) {
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
    <section className="relative overflow-hidden bg-[#fbfbf8] dark:bg-slate-950">
      {/* subtle animated blobs */}
      <motion.div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-orange-400/30 blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -left-16 bottom-0 h-52 w-52 rounded-full bg-indigo-400/20 blur-3xl"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT SIDE */}
        <div>
          <motion.div
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-orange-100 mb-3"
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs text-white">
              ★
            </span>
            <span className="text-xs md:text-sm font-medium text-slate-700">
              100% trusted rental platform in the world
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.05)}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900 dark:text-white"
          >
            Find Your Best{" "}
            <span className="text-orange-500">Dream Car for Rental</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.12)}
            className="mt-4 text-slate-600 dark:text-slate-300 max-w-xl"
          >
            Experience the ultimate in comfort, performance and sophistication.
            From sleek sedans to spacious SUVs, choose the perfect ride for your
            next journey in just a few clicks.
          </motion.p>

          <motion.div
            {...fadeUp(0.2)}
            className="mt-6 flex flex-wrap gap-3 items-center"
          >
            <motion.a
              href="#book"
              variants={primaryBtnVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="px-6 py-3 rounded-lg font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-colors"
            >
              Book a Car
            </motion.a>

            <motion.a
              href="/vehicles"
              variants={ghostBtnVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="px-6 py-3 rounded-lg font-semibold border border-slate-300 text-slate-700 bg-white"
            >
              View All Cars →
            </motion.a>
          </motion.div>

          {/* small stats chips */}
          <motion.div
            {...fadeUp(0.28)}
            className="mt-6 flex flex-wrap gap-4 text-xs md:text-sm text-slate-600 dark:text-slate-300"
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              <span>Instant confirmations</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-sky-500" />
              <span>No hidden charges</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <span>24/7 support</span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE – CAR */}
        <motion.div
          ref={wrapRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onLeave}
          {...fadeUp(0.1)}
          className="relative"
        >
          {/* glowing road strip behind car */}
          <motion.div
            className="absolute -bottom-6 left-10 right-0 h-40 bg-gradient-to-tr from-orange-400 to-orange-500 rounded-tl-[80px] rounded-bl-[0px] rounded-tr-[120px] -skew-x-12 opacity-80"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 0.85, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          />
          <div className="relative">
            <animated.img
              src={CAR_IMG}
              alt="Car"
              className="w-full max-w-xl mx-auto drop-shadow-2xl will-change-transform"
              style={{
                transform: springTo([x, y, r], (vx, vy, vr) =>
                  `translate3d(${vx}px, ${vy}px, 0) rotate(${vr}deg)`
                ),
              }}
            />
          </div>

          {/* floating card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.35 }}
            className="absolute right-1 md:right-6 bottom-4 bg-white/90 backdrop-blur-lg rounded-xl shadow-lg p-4 text-xs md:text-sm w-64"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-slate-900">Audi A4</p>
                <p className="text-[11px] text-slate-500">
                  Luxury Sedan • Automatic
                </p>
              </div>
              <span className="text-sm font-bold text-orange-500">$89/day</span>
            </div>
            <div className="mt-2 text-slate-600 text-[11px]">
              Seats 5 • Free cancellation • Unlimited mileage
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* BOOKING BAR */}
      <div id="book" className="relative max-w-7xl mx-auto px-4 pb-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          whileHover={{ scale: 1.01, y: -2 }}
          className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white rounded-2xl px-5 py-6 md:px-8 md:py-8 shadow-2xl border border-white/5"
        >
          <form
            onSubmit={submit}
            className="grid gap-4 items-end md:grid-cols-[1.1fr_1.1fr_0.9fr_auto]"
          >
            <div>
              <label className="block text-xs md:text-sm mb-2 opacity-80">
                Name *
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:text-slate-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm mb-2 opacity-80">
                Pickup Location *
              </label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City or Airport"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:text-slate-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm mb-2 opacity-80">
                Date * (dd/mm/yyyy)
              </label>
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="dd/mm/yyyy"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:text-slate-400 text-sm"
              />
            </div>

            <motion.button
              type="submit"
              variants={primaryBtnVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="h-[48px] md:h-[54px] px-7 rounded-xl font-semibold bg-orange-500 hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <span>Search &amp; Book</span>
              <span className="text-lg">🚗</span>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
