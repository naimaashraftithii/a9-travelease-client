// src/pages/UpdateVehicle.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchVehicle, updateVehicle } from "../api/vehicles";
import Loader from "../components/Loader";
import { alertSuccess, alertError } from "../lib/alert";
import { useState, useEffect } from "react";

export default function UpdateVehicle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: vehicle, isLoading, error } = useQuery({
    queryKey: ["vehicle", id],
    queryFn: () => fetchVehicle(id),
  });

  const [form, setForm] = useState(null);

  useEffect(() => {
    if (vehicle) {
      setForm({
        vehicleName: vehicle.vehicleName || "",
        owner: vehicle.owner || "",
        category: vehicle.category || "Sedan",
        pricePerDay: vehicle.pricePerDay || 0,
        location: vehicle.location || "",
        availability: vehicle.availability || "Available",
        description: vehicle.description || "",
        coverImage: vehicle.coverImage || "",
      });
    }
  }, [vehicle]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload) => updateVehicle(id, payload),
    onSuccess: async () => {
      await alertSuccess("Vehicle updated successfully!");
      qc.invalidateQueries({ queryKey: ["vehicle", id] });
      qc.invalidateQueries({ queryKey: ["vehicles"] });
      qc.invalidateQueries({ queryKey: ["myVehicles"] });
      navigate("/myVehicles");
    },
    onError: (e) => alertError("Failed to update vehicle", e.message),
  });

  const onChange = (k, v) =>
    setForm((s) => ({
      ...s,
      [k]: v,
    }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form) return;
    try {
      await mutateAsync({
        ...form,
        pricePerDay: Number(form.pricePerDay) || 0,
      });
    } catch {
      // handled in onError
    }
  };

  if (isLoading || !form) return <Loader />;
  if (error) return <div className="py-10 text-center">Failed to load vehicle.</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Update Vehicle</h1>

      <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4">
        <input
          className="input input-bordered"
          placeholder="Vehicle Name"
          value={form.vehicleName}
          onChange={(e) => onChange("vehicleName", e.target.value)}
          required
        />

        <input
          className="input input-bordered"
          placeholder="Owner Name"
          value={form.owner}
          onChange={(e) => onChange("owner", e.target.value)}
          required
        />

        <select
          className="select select-bordered"
          value={form.category}
          onChange={(e) => onChange("category", e.target.value)}
        >
          <option>Sedan</option>
          <option>SUV</option>
          <option>Electric</option>
          <option>Van</option>
        </select>

        <input
          className="input input-bordered"
          placeholder="Price Per Day"
          type="number"
          value={form.pricePerDay}
          onChange={(e) => onChange("pricePerDay", e.target.value)}
          required
        />

        <input
          className="input input-bordered"
          placeholder="Location"
          value={form.location}
          onChange={(e) => onChange("location", e.target.value)}
          required
        />

        <select
          className="select select-bordered"
          value={form.availability}
          onChange={(e) => onChange("availability", e.target.value)}
        >
          <option>Available</option>
          <option>Booked</option>
        </select>

        <input
          className="input input-bordered md:col-span-2"
          placeholder="Cover Image URL"
          value={form.coverImage}
          onChange={(e) => onChange("coverImage", e.target.value)}
        />

        <textarea
          className="textarea textarea-bordered md:col-span-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) => onChange("description", e.target.value)}
        />

        <button
          className="btn btn-primary md:col-span-2"
          disabled={isPending}
        >
          {isPending ? "Saving…" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
