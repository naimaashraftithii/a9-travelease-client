// src/pages/MyBookings.jsx
import { useQuery } from "@tanstack/react-query";
import { myBookings } from "../api/bookings";
import { safeImg } from "../utils/images";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { format } from "date-fns";

export default function MyBookings() {
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["myBookings"],
    enabled: !!user,          // only run if logged in
    queryFn: myBookings,      // ✅ no args
  });

  if (!user) {
    return (
      <div className="py-10 text-center">
        Please login to see your bookings.
      </div>
    );
  }

  if (isLoading)
    return <Loader fullscreen={false} text="Loading your bookings..." />;

  if (error) {
    console.error("Bookings error:", error);
    const msg =
      error.response?.data?.message || error.message || "Unknown error";
    return (
      <div className="text-center py-10">
        Error loading bookings
        <p className="text-sm text-red-400 mt-1">{msg}</p>
      </div>
    );
  }

  const list = Array.isArray(data) ? data : [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-2xl md:text-3xl font-bold">
          My <span className="text-primary">Bookings</span>
        </h1>
        <p className="text-sm opacity-70">
          Total bookings:{" "}
          <span className="font-semibold">{list.length}</span>
        </p>
      </div>

      {list.length === 0 && (
        <p className="text-sm opacity-70">
          No bookings found yet. Go to All Vehicles and request a ride.
        </p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((b, idx) => {
          const v = b.vehicle || {};
          const created = b.createdAt;

          let prettyDate = "";
          try {
            if (created) prettyDate = format(new Date(created), "dd MMM yyyy");
          } catch {
            prettyDate = "";
          }

          return (
            <motion.div
              key={b._id}
              className="card bg-base-200 h-full flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.3 }}
            >
              <figure className="aspect-video">
                <img
                  src={safeImg(v.coverImage)}
                  alt={v.vehicleName || "Vehicle"}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body flex flex-col">
                <div>
                  <h3 className="card-title">{v.vehicleName || "Unknown car"}</h3>
                  <p className="text-sm opacity-80">{v.category}</p>
                  <p className="text-sm opacity-70">
                    Location: {v.location || "N/A"}
                  </p>

                  <p className="text-sm font-semibold mt-1">
                    Price:{" "}
                    {typeof v.pricePerDay === "number"
                      ? `$${v.pricePerDay}/day`
                      : "N/A"}
                  </p>

                  <p className="text-xs opacity-70 mt-1">
                    Status:{" "}
                    <span
                      className={
                        b.status === "booked" || b.status === "confirmed"
                          ? "text-green-400 font-semibold"
                          : "text-yellow-400 font-semibold"
                      }
                    >
                      {b.status || "Interested"}
                    </span>
                    {prettyDate && ` · ${prettyDate}`}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs opacity-70">
                  <span>Booking ID: {b._id.slice(-6)}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
