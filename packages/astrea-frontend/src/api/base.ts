const getApiBaseUrl = () => {
  const rawApiBaseUrl = import.meta.env.VITE_API_URL;

  if (rawApiBaseUrl) {
    return rawApiBaseUrl.replace(/\/$/, "");
  }

  if (import.meta.env.DEV) {
    return "http://localhost:8080";
  }

  throw new Error(
    "VITE_API_URL is not set. Configure it in Vercel to point to the backend deployment.",
  );
};

export const API_BASE_URL = getApiBaseUrl();

export const createApiUrl = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};
