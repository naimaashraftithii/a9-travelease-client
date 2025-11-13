// src/components/CarouselTwo.jsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// === Car data with individual images ===
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
const SLIDES = CAR_TYPES.reduce((acc, _, i, arr) => {
  if (i % GROUP_SIZE === 0) acc.push(arr.slice(i, i + GROUP_SIZE));
  return acc;
}, []);

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
  const timer = useRef(null);
  const next = () => setI(p => (p + 1) % SLIDES.length);
  const prev = () => setI(p => (p - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    timer.current = setInterval(next, 4000);
    return () => clearInterval(timer.current);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
            Most Popular{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">
              Car Types
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-500 text-sm md:text-base">
            Explore the most sought-after car categories known for comfort and performance.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl bg-white/70 backdrop-blur shadow-lg ring-1 ring-slate-100">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${i * 100}%)` }}
            >
              {SLIDES.map((slide, idx) => (
                <div key={idx} className="min-w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                  {slide.map(car => (
                    <motion.div
                      key={car.name}
                      whileHover={{ scale: 1.06 }}
                      transition={{ type: "spring", stiffness: 250 }}
                      className="relative overflow-hidden rounded-2xl m-2 shadow group cursor-pointer"
                    >
                      <img
                        src={car.img}
                        alt={car.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-40 transition-all"
                      />
                      <div className="relative text-center py-12 px-6">
                        <motion.div whileHover={{ rotate: 5 }} transition={{ duration: 0.3 }}>
                          <CarIcon color={car.color} />
                        </motion.div>
                        <h3 className="font-bold text-lg md:text-xl text-slate-900 drop-shadow-sm">
                          {car.name}
                        </h3>
                        <p className="text-xs text-slate-600 mt-1">
                          {car.count} {car.count === 1 ? "Car" : "Cars"}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>

            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-pink-500 hover:text-white transition-all"
            >
              ❮
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-pink-500 hover:text-white transition-all"
            >
              ❯
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-5">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                className={`h-2.5 rounded-full transition-all ${
                  i === idx
                    ? "w-6 bg-gradient-to-r from-indigo-500 to-pink-500"
                    : "w-2.5 bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-full text-sm font-semibold hover:from-pink-500 hover:to-indigo-500 shadow-md transition-all hover:shadow-lg">
            View all Cars →
          </button>
        </div>
      </div>
    </section>
  );
}
