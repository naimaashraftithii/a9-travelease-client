import { Link } from "react-router-dom";

export default function VehicleCard({ v }) {
  return (
    <div className="card bg-base-200 shadow">
      <figure className="aspect-video">
        <img src={v.coverImage} alt={v.vehicleName} />
      </figure>
      <div className="card-body">
        <h3 className="card-title">{v.vehicleName}</h3>
        <p>{v.category} • {v.location}</p>
        <p className="font-semibold">${v.pricePerDay}/day</p>
        <Link to={`/vehicles/${v._id}`} className="btn btn-primary mt-2">
          View Details
        </Link>
      </div>
    </div>
  );
}
