// src/pages/AllVehicles.jsx

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchVehicles } from "../api/vehicles";

function VehicleCard({ v }) {
  return (
    <div className="card bg-base-200 h-full">
      <figure className="aspect-video overflow-hidden">
        <img src={v.coverImage} alt={v.vehicleName} className="w-full h-full object-cover" />
      </figure>
      <div className="card-body">
        <h3 className="card-title">{v.vehicleName}</h3>
        <p className="text-sm opacity-80">{v.location} • {v.category}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-semibold">${v.pricePerDay}/day</span>
          <a className="btn btn-sm" href={`/vehicles/${v._id}`}>View Details</a>
        </div>
      </div>
    </div>
  );
}

export default function AllVehicles() {
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["vehicles", filters],
    queryFn: () => fetchVehicles(filters),
  });

  // ✅ actually use onChange
  const onChange = (k, v) => setFilters((s) => ({ ...s, [k]: v }));

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">All Vehicles</h1>

      <div className="grid md:grid-cols-6 gap-3">
        <select
          className="select select-bordered"
          value={filters.category}
          onChange={(e) => onChange("category", e.target.value)}
        >
          <option value="">All Categories</option>
          <option>Sedan</option>
          <option>SUV</option>
          <option>Electric</option>
          <option>Van</option>
        </select>

        <input
          className="input input-bordered"
          placeholder="Location"
          value={filters.location}
          onChange={(e) => onChange("location", e.target.value)}
        />

        <input
          className="input input-bordered"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e) => onChange("minPrice", e.target.value)}
        />

        <input
          className="input input-bordered"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) => onChange("maxPrice", e.target.value)}
        />

        <select
          className="select select-bordered"
          value={filters.sortBy}
          onChange={(e) => onChange("sortBy", e.target.value)}
        >
          <option value="createdAt">Newest</option>
          <option value="pricePerDay">Price</option>
        </select>

        <select
          className="select select-bordered"
          value={filters.sortOrder}
          onChange={(e) => onChange("sortOrder", e.target.value)}
        >
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
      </div>

      {isLoading ? (
        <div>Loading…</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(data?.items || []).map((v) => <VehicleCard key={v._id} v={v} />)}
        </div>
      )}
    </div>
  );
}
