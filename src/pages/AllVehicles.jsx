import { useQuery } from "@tanstack/react-query";
import { fetchVehicles } from "../api/vehicles";
import Loader from "../components/Loader";
import VehicleCard from "../components/VehicleCard";

export default function AllVehicles() {
  const { data, isLoading } = useQuery({
    queryKey: ["vehicles"],
    queryFn: fetchVehicles,
  });

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">All Vehicles</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(data || []).map((v) => <VehicleCard key={v._id} v={v} />)}
      </div>
    </div>
  );
}
