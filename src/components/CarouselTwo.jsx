// src/components/CarouselTwo.jsx
import { useEffect, useRef, useState } from "react";

const IMAGES = [
  "https://i.ibb.co.com/h1xJRX9g/9fca5b30b0c4243b96c6eabb37d7f3bc.jpg",
  "https://i.ibb.co.com/cK5tWQ42/29dc318fe68c5354787eba3cf0685fdd.jpg",
  "https://i.ibb.co.com/Fk3197r8/068f4df9d0d3f5767b5cb42ae3fb1f4b.jpg",
  "https://i.ibb.co.com/9mJtx35X/388f7dc46b65a6cfcb18cd53e8e5eada.jpg",
];

export default function CarouselTwo() {
  const [i, setI] = useState(0);
  const timerRef = useRef(null);

  const next = () => setI((p) => (p + 1) % IMAGES.length);
  const prev = () => setI((p) => (p - 1 + IMAGES.length) % IMAGES.length);

  useEffect(() => {
    timerRef.current = setInterval(next, 3500);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 my-8">
      <div className="relative overflow-hidden rounded-2xl shadow-lg">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${i * 100}%)` }}
        >
          {IMAGES.map((src, idx) => (
            <div key={idx} className="min-w-full h-56 sm:h-72 md:h-80">
              <img
                src={src}
                alt={`promo-${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* overlay headline (optional) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* controls */}
        <div className="absolute inset-0 flex items-center justify-between px-3">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="btn btn-circle btn-sm md:btn-md bg-base-100/80 hover:bg-base-100"
          >
            ❮
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="btn btn-circle btn-sm md:btn-md bg-base-100/80 hover:bg-base-100"
          >
            ❯
          </button>
        </div>

        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                i === idx ? "w-6 bg-white" : "bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
