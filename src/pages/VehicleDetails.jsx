import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchVehicle, fetchVehicleSummary, bookVehicle } from "../api/vehicles";
import { safeImg } from "../utils/images";
import Loader from "../components/Loader";
import { format } from "date-fns";
import Swal from "sweetalert2";

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: v, isLoading, error } = useQuery({
    queryKey: ["vehicle", id],
    queryFn: () => fetchVehicle(id),
  });

  const { data: sum } = useQuery({
    queryKey: ["vehicleSummary", id],
    queryFn: () => fetchVehicleSummary(id),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ status }) => bookVehicle(id, status),
    // Optimistic update: bump local counters immediately
    onMutate: async ({ status }) => {
      await qc.cancelQueries({ queryKey: ["vehicleSummary", id] });
      const prev = qc.getQueryData(["vehicleSummary", id]);
      qc.setQueryData(["vehicleSummary", id], (old) => {
        const base = old || { total: 0, interested: 0, booked: 0 };
        return {
          total: base.total + 1,
          interested: base.interested + (status === "Interested" ? 1 : 0),
          booked: base.booked + (status === "Booked" ? 1 : 0),
        };
      });

      // also optimistically add to myBookings if “Booked”
      if (status === "Booked") {
        await qc.cancelQueries({ queryKey: ["myBookings"] });
        const prevBookings = qc.getQueryData(["myBookings"]);
        qc.setQueryData(["myBookings"], (oldList = []) => {
          // minimal booking card
          const mini = {
            _id: `temp-${Date.now()}`,
            status: "Booked",
            vehicle: v,
          };
          return [mini, ...(Array.isArray(oldList) ? oldList : [])];
        });
        return { prev, prevBookings };
      }
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["vehicleSummary", id], ctx.prev);
      if (ctx?.prevBookings) qc.setQueryData(["myBookings"], ctx.prevBookings);
      Swal.fire({ icon: "error", title: "Failed", text: "Please try again." });
    },
    onSuccess: (_data, { status }) => {
      Swal.fire({
        icon: "success",
        title: status === "Interested" ? "Marked as Interested" : "Booked!",
        text:
          status === "Interested"
            ? "Interest +1 recorded."
            : "Booking +1 recorded and visible in My Bookings.",
      });
      qc.invalidateQueries({ queryKey: ["vehicleSummary", id] });
      qc.invalidateQueries({ queryKey: ["myBookings"] });
      qc.invalidateQueries({ queryKey: ["top3"] });
    },
  });

  if (isLoading) return <Loader fullscreen text="Loading details..." />;
  if (error) return <div className="text-center mt-20 text-red-500">Failed to load vehicle details.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
      <div>
        <img
          src={safeImg(v.coverImage)}
          alt={v.vehicleName}
          onError={(e) => (e.currentTarget.src = "https://picsum.photos/800/450")}
          className="rounded-xl w-full object-cover"
        />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold">{v.vehicleName}</h1>
          <button className="btn btn-ghost" onClick={() => navigate(-1)}>← Back</button>
        </div>
        <p className="mt-2 opacity-80">{v.location} • {v.category}</p>
        <p className="mt-2 text-sm opacity-60">Added on {format(new Date(v.createdAt || Date.now()), "PPP")}</p>

        <p className="mt-4">{v.description}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            disabled={isPending}
            onClick={() => mutateAsync({ status: "Interested" })}
            className="btn-grad"
          >
            I’m Interested
          </button>
          <button
            disabled={isPending}
            onClick={() => mutateAsync({ status: "Booked" })}
            className="btn-grad-2"
          >
            Book Now
          </button>
        </div>

        <div className="mt-6 text-sm">
          <div>Total: <b>{sum?.total ?? "—"}</b></div>
          <div>Interested: <b>{sum?.interested ?? "—"}</b></div>
          <div>Booked: <b>{sum?.booked ?? "—"}</b></div>
        </div>
      </div>
    </div>
  );
}
