// src/components/CarouselTwo.jsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// 15 cars → 3 slides → 5 cards per slide
const CARS = [
  {
    name: "Urban Explorer",
    type: "SUV",
    count: 7,
    img: "https://images.pexels.com/photos/3767293/pexels-photo-3767293.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "City Compact",
    type: "Hatchback",
    count: 5,
    img: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Family Tourer",
    type: "MPV",
    count: 6,
    img: "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Business Class",
    type: "Luxury Sedan",
    count: 5,
    img: "https://images.pexels.com/photos/2100191/pexels-photo-2100191.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Weekend Runner",
    type: "Sedan",
    count: 4,
    img: "https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=800",
  },

  {
    name: "Adventure Pro",
    type: "Pickup",
    count: 6,
    img: "https://images.pexels.com/photos/1178448/pexels-photo-1178448.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Eco Glide",
    type: "Electric",
    count: 7,
    img: "https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Coastal Cruiser",
    type: "Convertible",
    count: 5,
    img: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "City Shuttle",
    type: "Van",
    count: 3,
    img: "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Sportline R",
    type: "Sports Coupe",
    count: 6,
    img: "https://images.pexels.com/photos/3767293/pexels-photo-3767293.jpeg?auto=compress&cs=tinysrgb&w=800",
  },

  {
    name: "Metro Move",
    type: "Crossover",
    count: 5,
    img: "https://images.pexels.com/photos/2100191/pexels-photo-2100191.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Daily Drive",
    type: "Sedan",
    count: 4,
    img: "https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Compact EV",
    type: "Electric",
    count: 6,
    img: "https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Flexi Wagon",
    type: "Wagon",
    count: 3,
    img: "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Campus Ride",
    type: "Hatchback",
    count: 5,
    img: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

// 5 cards per slide → 15 / 5 = 3 slides
const SLIDE_SIZE = 5;
const SLIDES = CARS.reduce((acc, _, i, arr) => {
  if (i % SLIDE_SIZE === 0) acc.push(arr.slice(i, i + SLIDE_SIZE));
  return acc;
}, []);

/** Big car icon (top of cards) */
function CarHeroIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 128 64"
      className={`w-12 h-12 mx-auto text-white drop-shadow ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
    >
      <path d="M10 40h80c6 0 10-6 10-13S93 12 84 10c-9-2-30-2-37 0-6 2-13 9-16 14l-21 1v15z" />
      <path d="M38 24h36c8 0 13 6 13 13H25c0-8 5-13 13-13z" />
      <circle cx="34" cy="48" r="6" />
      <circle cx="88" cy="48" r="6" />
    </svg>
  );
}

/** Tiny car icon for the "5/7 cars" rating bar */
function CarMiniIcon({ active }) {
  return (
    <svg
      viewBox="0 0 32 16"
      className={`w-4 h-4 ${
        active ? "text-yellow-300" : "text-slate-500/50"
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 11h18c2 0 3-2 3-4s-3-4-5-5c-3-1-9-1-12 0-2 1-4 3-5 5v4z" />
      <circle cx="8" cy="12" r="2" />
      <circle cx="18" cy="12" r="2" />
    </svg>
  );
}

export default function CarouselTwo() {
  const [i, setI] = useState(0);
  const timerRef = useRef(null);

  const next = () => setI((p) => (p + 1) % SLIDES.length);
  const prev = () => setI((p) => (p - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    timerRef.current = setInterval(next, 4500);
    return () => clearInterval(timerRef.current);
  }, []);

  const pause = () => timerRef.current && clearInterval(timerRef.current);
  const resume = () => {
    timerRef.current && clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 4500);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-50">
            Popular Car Categories
          </h2>
          <p className="max-w-2xl mx-auto text-slate-300 mt-3 text-sm md:text-base">
            Explore the most requested vehicle types – from budget city cars to
            adventure-ready SUVs, all at your fingertips.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative" onMouseEnter={pause} onMouseLeave={resume}>
          <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900/90 via-slate-900 to-slate-950 shadow-xl ring-1 ring-slate-800/60">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${i * 100}%)` }}
            >
              {SLIDES.map((slide, idx) => (
                <div
                  key={idx}
                  className="min-w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
                >
                  {slide.map((car) => (
                    <motion.div
                      key={car.name}
                      whileHover={{ y: -4, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="m-3 rounded-2xl bg-gradient-to-b from-slate-800/60 via-slate-900 to-slate-950 border border-slate-700/70 hover:border-amber-400/70 hover:shadow-amber-400/20 hover:shadow-xl transition-all"
                    >
                      {/* Image */}
                      <div className="h-28 w-full overflow-hidden rounded-t-2xl">
                        <img
                          src={car.img}
                          alt={car.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-4 text-center text-slate-100">
                        <CarHeroIcon className="mt-[-22px]" />
                        <h3 className="mt-1 font-semibold text-sm md:text-base">
                          {car.name}
                        </h3>
                        <p className="text-xs text-slate-400">{car.type}</p>

                        {/* 5/7 cars style popularity */}
                        <div className="mt-3 flex items-center justify-center gap-1">
                          {Array.from({ length: 7 }).map((_, idx2) => (
                            <CarMiniIcon
                              key={idx2}
                              active={idx2 < Math.min(car.count, 7)}
                            />
                          ))}
                        </div>
                        <p className="mt-1 text-[11px] text-slate-400">
                          Popularity:{" "}
                          <span className="text-amber-300 font-semibold">
                            {Math.min(car.count, 7)}/7
                          </span>{" "}
                          cars
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>

            {/* Arrows */}
            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-900/90 text-slate-100 shadow-lg border border-slate-700 hover:bg-amber-400 hover:text-slate-900 hover:border-amber-300 transition"
            >
              ❮
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-slate-900/90 text-slate-100 shadow-lg border border-slate-700 hover:bg-amber-400 hover:text-slate-900 hover:border-amber-300 transition"
            >
              ❯
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-5">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                className={`h-2.5 rounded-full transition-all ${
                  i === idx
                    ? "w-7 bg-amber-400"
                    : "w-2.5 bg-slate-600 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA — go to All Vehicles page */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/allVehicles"
            className="px-7 py-2.5 rounded-full text-sm font-semibold text-slate-900 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 shadow-lg hover:brightness-110 transition"
          >
            View all Vehicles →
          </Link>
        </div>
      </div>
    </section>
  );
}
