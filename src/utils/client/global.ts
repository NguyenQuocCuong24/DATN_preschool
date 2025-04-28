
export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};
const isBrowser = typeof window !== "undefined";
export const getAccessTokenFromLocalStorage = () => {
  return isBrowser ? localStorage.getItem("token") : null;
};
export const getRefreshTokenToLocalStorage = () => {
  return isBrowser ? localStorage.getItem("refreshToken") : null;
};
export const setAccessTokenToLocalStorage = (token: string) =>
  isBrowser && localStorage.setItem("token", token);
export const setRefreshTokenToLocalStorage = (refreshToken: string) =>
  isBrowser && localStorage.setItem("refreshToken", refreshToken);
export const removeTokenLocalStorage = () => {
  if (isBrowser) localStorage.removeItem("token");
  if (isBrowser) localStorage.removeItem("refreshToken");
};