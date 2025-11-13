// src/pages/VehicleDetails.jsx
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchVehicle } from "../api/vehicles";
import { createBooking } from "../api/bookings";
import Loader from "../components/Loader";
import { safeImg } from "../utils/images";
import { alertSuccess, alertError } from "../lib/alert";
import { useAuth } from "../context/AuthContext";   // 🆕 get user

export default function VehicleDetails() {
  const { id } = useParams();
  const qc = useQueryClient();
  const { user } = useAuth();                       // 🆕

  const { data: vehicle, isLoading, error } = useQuery({
    queryKey: ["vehicle", id],
    queryFn: () => fetchVehicle(id),
  });

  const { mutateAsync: book, isPending } = useMutation({
    mutationFn: (payload) => createBooking(payload),
    onSuccess: async () => {
      await alertSuccess("Ride requested successfully!");
      // invalidate all queries that start with ["myBookings"]
      qc.invalidateQueries({ queryKey: ["myBookings"] });
    },
    onError: (e) => {
      alertError("Failed to book vehicle", e.message);
    },
  });

  const handleBook = async () => {
    if (!vehicle?._id) return;

    if (!user?.email) {
      alertError("You must be logged in to book a vehicle.");
      return;
    }

    try {
      await book({
        vehicleId: vehicle._id,
        status: "requested",
        email: user.email,      // 🆕 for servers expecting `email`
        userEmail: user.email,  // 🆕 for servers expecting `userEmail`
      });
    } catch {
      // error handled in onError
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <div className="py-10 text-center">Failed to load vehicle.</div>;
  if (!vehicle) return <div className="py-10 text-center">Vehicle not found.</div>;

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div>
        <img
          src={safeImg(vehicle.coverImage)}
          alt={vehicle.vehicleName}
          className="w-full rounded-lg shadow-lg object-cover"
        />
      </div>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{vehicle.vehicleName}</h1>
        <p className="opacity-80">{vehicle.description}</p>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="font-semibold">Owner:</span> {vehicle.owner}
          </div>
          <div>
            <span className="font-semibold">Category:</span> {vehicle.category}
          </div>
          <div>
            <span className="font-semibold">Location:</span> {vehicle.location}
          </div>
          <div>
            <span className="font-semibold">Availability:</span>{" "}
            {vehicle.availability}
          </div>
          <div>
            <span className="font-semibold">Price/Day:</span> $
            {vehicle.pricePerDay}
          </div>
        </div>

        <button
          className="btn btn-primary mt-4"
          onClick={handleBook}
          disabled={isPending}
        >
          {isPending ? "Submitting…" : "Book Now / Request Ride"}
        </button>
      </div>
    </div>
  );
}
