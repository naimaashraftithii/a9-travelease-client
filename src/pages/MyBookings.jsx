import { useQuery } from "@tanstack/react-query";
import { myBookings } from "../api/bookings";
import { safeImg } from "../utils/images";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";

export default function MyBookings() {
  const { user } = useAuth();


  const { data, isLoading, error } = useQuery({
    queryKey: ["myBookings", user?.email],
    enabled: !!user?.email,        
    queryFn: myBookings,          
  });

  if (isLoading) return <Loader />;

  if (error) {
    const msg =
      error.response?.data?.message ||
      error.message ||
      "Unknown error loading bookings";

    return (
      <div className="text-center py-10">
        <p className="text-red-500 font-bold">Error loading bookings</p>
        <p className="text-sm text-red-400">{msg}</p>
      </div>
    );
  }

  const list = Array.isArray(data) ? data : [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>

      {list.length === 0 && (
        <p className="text-sm opacity-70">No bookings found yet.</p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((b) => (
          <div key={b._id} className="card bg-base-200 h-full">
            <figure className="aspect-video">
              <img
                src={safeImg(b?.vehicle?.coverImage)}
                alt={b?.vehicle?.vehicleName || "Vehicle"}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{b?.vehicle?.vehicleName}</h3>
              <p className="text-sm opacity-80">{b?.vehicle?.category}</p>
              <p className="text-sm opacity-70">
                Location: {b?.vehicle?.location}
              </p>
              <p className="text-sm font-semibold text-primary">
                Status: {b?.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
