// src/lib/alert.js
import Swal from "sweetalert2";

// Base styled instance (fits Tailwind/DaisyUI buttons)
export const swal = Swal.mixin({
  buttonsStyling: false,
  customClass: {
    confirmButton: "btn btn-primary",
    cancelButton: "btn",
    denyButton: "btn btn-error",
    popup: "rounded-xl shadow-xl",
    title: "font-bold",
  },
});

export const alertSuccess = (title = "Success", text = "") =>
  swal.fire({ icon: "success", title, text });

export const alertError = (title = "Oops!", text = "") =>
  swal.fire({ icon: "error", title, text });

export const alertInfo = (title = "Info", text = "") =>
  swal.fire({ icon: "info", title, text });

export const confirm = (
  title = "Are you sure?",
  text = "This action cannot be undone."
) =>
  swal.fire({
    icon: "warning",
    title,
    text,
    showCancelButton: true,
    confirmButtonText: "Yes, continue",
    cancelButtonText: "Cancel",
    reverseButtons: true,
  });
