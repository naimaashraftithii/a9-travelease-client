import { useQuery } from "@tanstack/react-query";
import { fetchBookings } from "../api/bookings";
import { useAuth } from "../context/AuthContext.js";
import Loader from "../components/Loader";

export default function MyBookings() {
  const { user } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: () => fetchBookings(user.email),
    enabled: !!user,
  });

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      <table className="table">
        <thead><tr><th>Vehicle</th><th>Status</th></tr></thead>
        <tbody>
          {(data || []).map((b) => (
            <tr key={b._id}>
              <td>{b.vehicleName}</td>
              <td>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
