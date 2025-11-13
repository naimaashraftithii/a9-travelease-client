// src/pages/Home.jsx
import { useQuery } from "@tanstack/react-query";
import { fetchVehicles, fetchTopVehicles } from "../api/vehicles";
import { formatDistanceToNow } from "date-fns";
import HeroBooking from "../components/HeroBooking";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import { safeImg } from "../utils/images";
import { Link, useNavigate } from "react-router-dom";
import CarouselTwo from "../components/CarouselTwo"; // ⬅️ add

export default function Home() {
  const nav = useNavigate();

  const { data: latest, isLoading: loadLatest } = useQuery({
    queryKey: ["latest"],
    queryFn: () =>
      fetchVehicles({ sortBy: "createdAt", sortOrder: "desc", limit: 6 }),
  });

  const { data: top, isLoading: loadTop } = useQuery({
    queryKey: ["top3"],
    queryFn: () => fetchTopVehicles(3),
  });

  return (
    <div className="space-y-12">
      <HeroBooking />

      {/* ✅ second carousel */}
      <CarouselTwo />

      {/* Top Rated */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <motion.h2 className="text-2xl font-bold" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            Top Rated Vehicles
          </motion.h2>
          <button
            onClick={() => nav("/vehicles")}
            className="btn-grad text-sm"
            aria-label="See all vehicles"
          >
            All Vehicles
          </button>
        </div>

        {loadTop && <Loader />}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(top || []).map((v) => (
            <div key={v._id} className="card bg-base-200">
              <figure className="aspect-video">
                <img src={safeImg(v.coverImage)} alt={v.vehicleName} />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{v.vehicleName}</h3>
                <p className="text-sm opacity-80">{v.location} • {v.category}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-semibold">${v.pricePerDay}/day</span>
                  <Link className="btn-grad text-sm" to={`/vehicles/${v._id}`}>
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-4">
          <motion.h2 className="text-2xl font-bold" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            Latest Arrivals
          </motion.h2>
          <button
            onClick={() => nav("/vehicles?showFilters=1")}
            className="btn-grad-2 text-sm"
            aria-label="Advanced Filtering"
          >
            Advanced Filtering
          </button>
        </div>

        {loadLatest && <Loader />}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(latest?.items || []).slice(0, 6).map((v) => (
            <div key={v._id} className="card bg-base-200">
              <figure className="aspect-video">
                <img src={safeImg(v.coverImage)} alt={v.vehicleName} />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{v.vehicleName}</h3>
                <p className="text-sm opacity-80">{v.location} • {v.category}</p>
                <p className="text-xs opacity-60">
                  added {formatDistanceToNow(new Date(v.createdAt || v.updatedAt || Date.now()))} ago
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-semibold">${v.pricePerDay}/day</span>
                  <Link className="btn-grad text-sm" to={`/vehicles/${v._id}`}>
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
