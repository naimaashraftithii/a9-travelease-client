// src/components/CarouselTwo.jsx
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// === Dynamic car data ===
const CAR_TYPES = [
  { name: "Family MPV", count: 1, color: "#4ADE80", img: "https://i.ibb.co/5Kk4G8R/family-car.jpg" },
  { name: "Pickup", count: 3, color: "#F87171", img: "https://i.ibb.co/TvWf6B1/pickup.jpg" },
  { name: "Sedan", count: 5, color: "#60A5FA", img: "https://i.ibb.co/8zyMbyM/sedan.jpg" },
  { name: "Crossover", count: 4, color: "#FACC15", img: "https://i.ibb.co/jHVWZdx/crossover.jpg" },
  { name: "Sports Coupe", count: 3, color: "#A78BFA", img: "https://i.ibb.co/SBmgJQF/sports.jpg" },
  { name: "Hatchback", count: 2, color: "#34D399", img: "https://i.ibb.co/gPzCvTt/hatchback.jpg" },
  { name: "SUV", count: 5, color: "#FB923C", img: "https://i.ibb.co/sq0rTgS/suv.jpg" },
  { name: "Convertible", count: 2, color: "#F472B6", img: "https://i.ibb.co/F75dR3S/convertible.jpg" },
  { name: "Luxury Sedan", count: 1, color: "#818CF8", img: "https://i.ibb.co/mFSzjBP/luxury.jpg" },
];

const GROUP_SIZE = 3;
const SLIDES = CAR_TYPES.reduce((acc, _, idx, arr) => {
  if (idx % GROUP_SIZE === 0) acc.push(arr.slice(idx, idx + GROUP_SIZE));
  return acc;
}, []);

// === Car Icon (gradient-filled SVG) ===
function CarIcon({ color }) {
  return (
    <svg
      viewBox="0 0 64 32"
      className="w-24 h-24 mx-auto mb-3 drop-shadow-lg"
      strokeWidth="3"
      stroke="currentColor"
      fill="url(#grad)"
    >
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <rect x="5" y="12" width="40" height="10" rx="3" />
      <path d="M12 12 L18 5 H34 L40 12" />
      <circle cx="16" cy="24" r="4" />
      <circle cx="36" cy="24" r="4" />
    </svg>
  );
}

export default function CarouselTwo() {
  const [i, setI] = useState(0);
  const timerRef = useRef(null);

  const next = () => setI((p) => (p + 1) % SLIDES.length);
  const prev = () => setI((p) => (p - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-white via-indigo-50/60 to-pink-50/60">
      {/* === Animated gradient background === */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 opacity-30 blur-3xl"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "300% 300%" }}
      />

      <div className="max-w-6xl mx-auto px-4 relative">
        {/* === Title === */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3"
          >
            Most Popular{" "}
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-pink-500 to-orange-400 bg-[length:200%_200%]"
            >
              Car Types
            </motion.span>
          </motion.h2>

          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex justify-center mb-4"
          >
            <svg width="120" height="16" viewBox="0 0 120 16">
              <path
                d="M5 12 Q60 0 115 12"
                fill="none"
                stroke="#f97316"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

          <p className="max-w-xl mx-auto text-slate-600 text-sm md:text-base">
            Explore the most sought-after car categories known for their comfort,
            performance, and innovation.
          </p>
        </div>

        {/* === Carousel === */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl bg-white/80 backdrop-blur-lg shadow-lg ring-1 ring-slate-100">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${i * 100}%)` }}
            >
              {SLIDES.map((slide, idx) => (
                <div key={idx} className="min-w-full relative">
                  {/* background image with dynamic opacity */}
                  <motion.img
                    src={slide[0].img}
                    alt="Car background"
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ duration: 0.6 }}
                    loading="lazy"
                  />
                  <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {slide.map((item) => (
                      <motion.div
                        key={item.name}
                        whileHover={{ scale: 1.08, y: -8 }}
                        transition={{ type: "spring", stiffness: 250 }}
                        className="relative border border-transparent group py-10 px-6 cursor-pointer"
                      >
                        <motion.div
                          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-200/40 via-pink-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-all"
                          animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                          }}
                          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                          style={{ backgroundSize: "200% 200%" }}
                        />
                        <div className="relative text-center">
                          <motion.div
                            whileHover={{ rotate: 8 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CarIcon color={item.color} />
                          </motion.div>
                          <h3 className="font-bold text-lg md:text-xl text-slate-900 drop-shadow-sm">
                            {item.name}
                          </h3>
                          <p className="text-xs text-slate-600 mt-1">
                            {item.count} {item.count === 1 ? "Car" : "Cars"}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* === Buttons === */}
            <motion.button
              onClick={prev}
              whileTap={{ scale: 0.9 }}
              whileHover={{
                background:
                  "linear-gradient(to right, #6366F1, #EC4899)",
                color: "#fff",
                scale: 1.1,
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center transition-all"
            >
              ❮
            </motion.button>
            <motion.button
              onClick={next}
              whileTap={{ scale: 0.9 }}
              whileHover={{
                background:
                  "linear-gradient(to right, #EC4899, #6366F1)",
                color: "#fff",
                scale: 1.1,
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center transition-all"
            >
              ❯
            </motion.button>
          </div>

          {/* === Dots === */}
          <div className="flex justify-center gap-2 mt-5">
            {SLIDES.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => setI(idx)}
                animate={{
                  width: i === idx ? 24 : 10,
                  backgroundColor:
                    i === idx ? "#6366F1" : "rgba(203,213,225,0.9)",
                }}
                transition={{ duration: 0.3 }}
                className="h-2.5 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* === Bottom Button === */}
        <div className="mt-10 flex justify-center">
          <motion.button
            whileHover={{
              scale: 1.07,
              background: "linear-gradient(to right, #EC4899, #6366F1)",
              boxShadow: "0 0 20px rgba(236,72,153,0.5)",
            }}
            transition={{ duration: 0.3 }}
            className="px-6 py-2 border border-transparent bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-full text-sm font-semibold shadow-md"
          >
            View all Cars →
          </motion.button>
        </div>
      </div>
    </section>
  );
}
