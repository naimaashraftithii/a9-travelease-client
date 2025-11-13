// src/utils/safeImg.js
const FALLBACK =
  "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=800";

export function safeImg(url) {
  if (!url || typeof url !== "string") return FALLBACK;
  return url;
}
