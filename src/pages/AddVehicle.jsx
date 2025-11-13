import { useState } from "react";
import { createVehicle } from "../api/vehicles";
import { useAuth } from "../context/AuthContext.js";
import Swal from "sweetalert2";

export default function AddVehicle() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const f = e.target;
    const payload = {
      vehicleName: f.vehicleName.value,
      owner: user.displayName,
      category: f.category.value,
      pricePerDay: parseFloat(f.pricePerDay.value),
      location: f.location.value,
      availability: f.availability.value,
      description: f.description.value,
      coverImage: f.coverImage.value,
      userEmail: user.email,
      createdAt: new Date().toISOString(),
    };

    try {
      await createVehicle(payload);
      Swal.fire("Added!", "Vehicle successfully added.", "success");
      f.reset();
    } catch {
      Swal.fire("Error", "Failed to add vehicle.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add Vehicle</h2>
      <div className="grid gap-3">
        <input name="vehicleName" placeholder="Vehicle Name" className="input input-bordered" required />
        <input name="category" placeholder="Category" className="input input-bordered" required />
        <input name="pricePerDay" placeholder="Price Per Day" type="number" className="input input-bordered" required />
        <input name="location" placeholder="Location" className="input input-bordered" required />
        <select name="availability" className="select select-bordered">
          <option>Available</option>
          <option>Booked</option>
        </select>
        <input name="coverImage" placeholder="Image URL" className="input input-bordered" required />
        <textarea name="description" placeholder="Description" className="textarea textarea-bordered"></textarea>
        <button disabled={loading} className="btn btn-primary">
          {loading ? "Adding..." : "Add Vehicle"}
        </button>
      </div>
    </form>
  );
}
