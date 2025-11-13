// src/pages/AllVehicles.jsx
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchVehicles } from "../api/vehicles";
import Loader from "../components/Loader";
import VehicleCard from "../components/VehicleCard";

export default function AllVehicles() {
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["vehicles", filters],
    queryFn: () => fetchVehicles(filters),
  });

  const onChange = (k, v) =>
    setFilters((s) => ({
      ...s,
      [k]: v,
    }));

  const setPriceSort = (order) =>
    setFilters((s) => ({
      ...s,
      sortBy: "pricePerDay",
      sortOrder: order,
    }));

  if (isLoading) return <Loader />;

  if (error) {
    console.error("AllVehicles error:", error);
    return (
      <div className="py-10 text-center text-red-500">
        Failed to load vehicles.
      </div>
    );
  }

  // data can be { items: [...] } or a plain array; normalize:
  const list = Array.isArray(data) ? data : data?.items || [];

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h1 className="text-2xl font-bold">All Vehicles</h1>

        {/* Price sort buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setPriceSort("asc")}
            className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-sky-500 hover:to-emerald-500"
          >
            Price ↑ (Low to High)
          </button>
          <button
            onClick={() => setPriceSort("desc")}
            className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-rose-500 to-orange-500 hover:from-orange-500 hover:to-rose-500"
          >
            Price ↓ (High to Low)
          </button>
        </div>
      </div>

      {/* Filters */}
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

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((v) => (
          <VehicleCard key={v._id} v={v} />
        ))}
      </div>
    </div>
  );
}
