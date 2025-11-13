// src/utils/swal.js
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// 🌈 Reusable SweetAlert2 setup with Tailwind + gradient styles
export const swal = Swal.mixin({
  buttonsStyling: false,
  customClass: {
    popup:
      "rounded-2xl shadow-2xl bg-slate-900/90 backdrop-blur-xl text-white border border-slate-700 p-4",
    title:
      "font-extrabold text-lg text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-md",
    confirmButton:
      "bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 text-white hover:from-green-500 hover:to-emerald-700 font-semibold border-none shadow-md rounded-lg px-5 py-2 mx-2 transition-all duration-300 focus:ring-2 focus:ring-green-400",
    cancelButton:
      "bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 text-white hover:from-gray-500 hover:to-gray-700 font-semibold border-none shadow-md rounded-lg px-5 py-2 mx-2 transition-all duration-300 focus:ring-2 focus:ring-gray-400",
    denyButton:
      "bg-gradient-to-r from-rose-500 via-red-500 to-orange-500 text-white hover:from-rose-600 hover:to-red-600 font-semibold border-none shadow-md rounded-lg px-5 py-2 mx-2 transition-all duration-300 focus:ring-2 focus:ring-red-400",
  },
});

// ✅ Success Alert
export const alertSuccess = (title = "✅ Success!", text = "") =>
  swal.fire({
    icon: "success",
    title,
    text,
    background: "linear-gradient(to right, #0f172a, #1e293b)",
    color: "#fff",
    showConfirmButton: true,
    confirmButtonText: "Great!",
  });

// ❌ Error Alert
export const alertError = (title = "❌ Oops!", text = "") =>
  swal.fire({
    icon: "error",
    title,
    text,
    background: "linear-gradient(to right, #1e293b, #3b0764)",
    color: "#fff",
    showConfirmButton: true,
    confirmButtonText: "Try Again",
  });

// ⚠️ Confirm Alert
export const confirm = (
  title = "⚠️ Are you sure?",
  text = "This action cannot be undone."
) =>
  swal.fire({
    icon: "warning",
    title,
    text,
    showCancelButton: true,
    confirmButtonText: "Yes, proceed",
    cancelButtonText: "Cancel",
    reverseButtons: true,
    background: "linear-gradient(to right, #0f172a, #1e293b)",
    color: "#fff",
  });
