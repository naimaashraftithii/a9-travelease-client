// src/pages/Home.jsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { fetchTopVehicles, fetchLatestVehicles } from "../api/vehicles";
import Loader from "../components/Loader";
import OurServices from "../components/OurServices";
import OurTestimonial from "../components/OurTestimonial";
import CarouselOne from "../components/CarouselOne";
import CarouselTwo from "../components/CarouselTwo";
import HeroBooking from "../components/HeroBooking";
import { safeImg } from "../utils/safeImg";

export default function Home() {
  const [filter, setFilter] = useState("latest");

  // 🔹 Latest 6 vehicles
  const {
    data: latestData,
    isLoading: loadingLatest,
    error: latestError,
  } = useQuery({
    queryKey: ["latestVehicles"],
    queryFn: fetchLatestVehicles,
  });

  // 🔹 Top vehicles by bookings
  const {
    data: topData,
    isLoading: loadingTop,
    error: topError,
  } = useQuery({
    queryKey: ["topVehicles", 3],
    queryFn: () => fetchTopVehicles(3),
  });

  const latest = latestData || [];
  const top = topData || [];

  const loadingSection = loadingLatest || loadingTop;
  const errorSection = latestError || topError;

  let displayedVehicles = [];
  if (filter === "latest") {
    displayedVehicles = latest.slice(0, 6);
  } else if (filter === "top") {
    displayedVehicles = top;
  }

  return (
    <>
      {/* Hero + carousels always visible */}
      <HeroBooking />
      <CarouselOne />

      <main className="max-w-7xl mx-auto px-4 py-10 space-y-12">
        {/* 🔹 Top Vehicles Section */}
        <section>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 className="text-2xl font-bold">Top Vehicles</h2>

            <div className="flex flex-wrap items-center gap-2">
              {/* Latest 6 */}
              <button
                onClick={() => setFilter("latest")}
                className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold border 
                  ${
                    filter === "latest"
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                  }`}
              >
                Latest 6
              </button>

              {/* Top 3 by bookings */}
              <button
                onClick={() => setFilter("top")}
                className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold border 
                  ${
                    filter === "top"
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                  }`}
              >
                Top 3 Most Booked
              </button>

              {/* Go to all vehicles page */}
              <Link
                to="/allVehicles"
                className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold
                  text-white border-none shadow
                  bg-gradient-to-r from-orange-500 via-pink-500 to-red-500
                  hover:from-red-500 hover:via-orange-500 hover:to-amber-400
                  transition-all"
              >
                View all Vehicles
                <span className="text-lg leading-none">➜</span>
              </Link>
            </div>
          </div>

          {/* Loader / Error / Grid */}
          {loadingSection && (
            <div className="py-8">
              <Loader text="Loading vehicles..." />
            </div>
          )}

          {errorSection && !loadingSection && (
            <div className="py-8 text-center text-red-500">
              Failed to load vehicles.
            </div>
          )}

          {!loadingSection && !errorSection && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedVehicles.map((v) => (
                <div
                  key={v._id}
                  className="card bg-base-200 hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
                >
                  <figure className="aspect-video overflow-hidden">
                    <img
                      src={safeImg(v.coverImage)}
                      alt={v.vehicleName}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title">{v.vehicleName}</h3>
                    <p className="text-sm opacity-80">
                      {v.location} • {v.category}
                    </p>
                    <p className="font-semibold">${v.pricePerDay}/day</p>

                    {v.totalBookings && (
                      <p className="text-xs opacity-80 mt-1">
                        🚗 Booked {v.totalBookings} time(s)
                      </p>
                    )}

                    <Link
                      className="btn btn-sm btn-primary mt-2"
                      to={`/vehicles/${v._id}`}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Extra sections */}
        <OurServices />
        <CarouselTwo />
        <OurTestimonial />
      </main>
    </>
  );
}
