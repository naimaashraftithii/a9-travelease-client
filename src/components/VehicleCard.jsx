
import { Link } from "react-router-dom";
import { safeImg } from "../utils/safeImg";

export default function VehicleCard({ v }) {
  return (
    <div className="card bg-base-200 h-full">
      <figure className="aspect-video overflow-hidden">
        <img
          src={safeImg(v.coverImage)}
          alt={v.vehicleName}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h3 className="card-title">{v.vehicleName}</h3>
        <p className="text-sm opacity-80">
          {v.location} • {v.category}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <span className="font-semibold">${v.pricePerDay}/day</span>
          <Link className="btn btn-sm btn-primary" to={`/vehicles/${v._id}`}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
