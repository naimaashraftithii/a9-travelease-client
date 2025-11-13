import { useLoaderData } from "react-router-dom";
import { updateVehicle } from "../api/vehicles";
import Swal from "sweetalert2";

export default function UpdateVehicle() {
  const vehicle = useLoaderData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const f = e.target;
    const payload = {
      vehicleName: f.vehicleName.value,
      pricePerDay: f.pricePerDay.value,
      location: f.location.value,
      description: f.description.value,
    };

    try {
      await updateVehicle(vehicle._id, payload);
      Swal.fire("Updated!", "Vehicle updated successfully.", "success");
    } catch {
      Swal.fire("Error", "Update failed.", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Update Vehicle</h2>
      <input name="vehicleName" defaultValue={vehicle.vehicleName} className="input input-bordered mb-2" />
      <input name="pricePerDay" defaultValue={vehicle.pricePerDay} className="input input-bordered mb-2" />
      <input name="location" defaultValue={vehicle.location} className="input input-bordered mb-2" />
      <textarea name="description" defaultValue={vehicle.description} className="textarea textarea-bordered mb-2"></textarea>
      <button className="btn btn-primary">Update</button>
    </form>
  );
}
