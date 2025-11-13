export const safeImg = (url) => {
  if (!url) return "";
  return url.replace("i.ibb.co.com", "i.ibb.co");
};
