// src/pages/Home.jsx
import { useQuery } from "@tanstack/react-query";
import { fetchTopVehicles } from "../api/vehicles";
import Loader from "../components/Loader";
import { safeImg } from "../utils/images";
import OurServices from "../components/OurServices";
import OurTestimonial from "../components/OurTestimonial";
import CarouselOne from "../components/CarouselOne";
import CarouselTwo from "../components/CarouselTwo";
import { Link } from "react-router-dom";   // 🆕 for navigation

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["topVehicles"],
    queryFn: () => fetchTopVehicles(3),
  });

  if (isLoading) return <Loader />;
  if (error) return <div className="py-10 text-center">Error loading vehicles.</div>;

  const list = Array.isArray(data) ? data : [];

  return (
    <div className="space-y-8">
      <CarouselOne />

      <section className="text-center py-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Travel <span className="text-primary">Easy</span> • Rent Your Ride
        </h1>
        <p className="max-w-xl mx-auto opacity-80">
          Add your vehicle, explore options, and manage bookings effortlessly.
        </p>
      </section>

      <section>
        {/* Title + All Vehicles button in one row */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Top Vehicles</h2>

          <Link
            to="/allVehicles" // 🔗 must match your router path
            className="
              inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold
              text-white border-none shadow
              bg-gradient-to-r from-orange-500 via-pink-500 to-red-500
              hover:from-red-500 hover:via-orange-500 hover:to-amber-400
              transition-all
            "
          >
            View all Vehicles
            <span className="text-lg leading-none">➜</span>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((v) => (
            <div key={v._id} className="card bg-base-200">
              <figure className="aspect-video">
                <img
                  src={safeImg(v.coverImage)}
                  alt={v.vehicleName}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{v.vehicleName}</h3>
                <p className="text-sm opacity-80">
                  {v.location} • {v.category}
                </p>
                <p className="font-semibold">${v.pricePerDay}/day</p>
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
      </section>

      <OurServices />
      <CarouselTwo />
      <OurTestimonial />
    </div>
  );
}
