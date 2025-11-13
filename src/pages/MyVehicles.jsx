import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchVehicles, deleteVehicle } from "../api/vehicles";
import { useAuth } from "../context/AuthContext.js";
import Swal from "sweetalert2";
import Loader from "../components/Loader";

export default function MyVehicles() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["myVehicles", user?.email],
    queryFn: () => fetchVehicles({ userEmail: user.email }),
    enabled: !!user,
  });

  const delMut = useMutation({
    mutationFn: (id) => deleteVehicle(id),
    onSuccess: () => qc.invalidateQueries(["myVehicles"]),
  });

  if (isLoading) return <Loader />;

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this vehicle?",
      icon: "warning",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) delMut.mutate(id);
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Vehicles</h1>
      <table className="table">
        <thead>
          <tr><th>Name</th><th>Price</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {data?.map((v) => (
            <tr key={v._id}>
              <td>{v.vehicleName}</td>
              <td>${v.pricePerDay}</td>
              <td>
                <button className="btn btn-error btn-sm" onClick={() => handleDelete(v._id)}>
                  Delete
                </button>
                <a href={`/updateVehicle/${v._id}`} className="btn btn-sm ml-2">
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
