// src/utils/safeImg.js

const FALLBACK =
  "https://i.ibb.co/8m1FfyS/car-placeholder.jpg"; // put a real placeholder image if you like

// very small helper to avoid broken images
export function safeImg(url) {
  if (!url || typeof url !== "string") return FALLBACK;

  // if already a full URL, use it
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // if your server returns relative paths, you can prefix them here:
  const BASE = import.meta.env.VITE_API_URL || "";
  return `${BASE}/${url.replace(/^\/+/, "")}`;
}
