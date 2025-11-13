// src/components/CarouselOne.jsx
import { useEffect, useRef, useState } from "react";

const IMAGES = [
  "https://i.ibb.co.com/V0m0hcQk/75e3db088a0da66f6aa8593f8374a008.jpg",
  "https://i.ibb.co.com/vC9G6L3K/01d7ba5adb48fb7954f73c64e83f24bd.jpg",
  "https://i.ibb.co.com/d4y2TmRs/2e9c0b580bd91896a24c683a25b2e75a.jpg",
  "https://i.ibb.co.com/9mBjm1nS/e5d944611fea5f030e6edc023a0c870f.jpg",
  "https://i.ibb.co.com/Y4CfRZZV/233957a69064eaf5bc100df79b6fb98d.jpg"
];

export default function CarouselOne() {
  const [i, setI] = useState(0);
  const timerRef = useRef(null);

  const next = () => setI((p) => (p + 1) % IMAGES.length);
  const prev = () => setI((p) => (p - 1 + IMAGES.length) % IMAGES.length);

  useEffect(() => {
    timerRef.current = setInterval(next, 4000);
    return () => clearInterval(timerRef.current);
  }, []);

  const pause = () => clearInterval(timerRef.current);
  const resume = () => (timerRef.current = setInterval(next, 4000));

  return (
    <div
      className="relative w-full overflow-hidden bg-base-200/60"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${i * 100}%)` }}
      >
        {IMAGES.map((src, idx) => (
          <div key={idx} className="min-w-full h-[280px] sm:h-[360px] md:h-[460px]">
            <img
              src={src}
              alt={`slide-${idx + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Left/Right */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="btn btn-circle btn-sm md:btn-md absolute left-3 top-1/2 -translate-y-1/2 bg-base-100/70 hover:bg-base-100"
      >
        ❮
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="btn btn-circle btn-sm md:btn-md absolute right-3 top-1/2 -translate-y-1/2 bg-base-100/70 hover:bg-base-100"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              i === idx ? "w-6 bg-orange-400" : "bg-gray-200/60 hover:bg-red-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
