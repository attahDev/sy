import axios from "axios";
import toast from "react-hot-toast";

declare module "axios" {
  interface AxiosRequestConfig {
    skipErrorToast?: boolean;
  }
}

export const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ?? "https://south-yorkshire-backend.onrender.com",
  withCredentials: true,
  timeout: 60000,
});

function getStoredToken() {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("token") || localStorage.getItem("token");
}

export function setStoredToken(token: string | null) {
  if (typeof window === "undefined") return;

  if (token) {
    localStorage.setItem("token", token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    delete api.defaults.headers.common.Authorization;
  }
}

api.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const config = error?.config;
    const status = error?.response?.status;
    const method = (config?.method || "get").toLowerCase();
    const isQuietGet404 = status === 404 && method === "get";

    if (!config?.skipErrorToast && !isQuietGet404 && typeof window !== "undefined") {
      const message = error?.response?.data?.message;
      if (typeof message === "string") {
        toast.error(message);
      } else if (Array.isArray(message)) {
        toast.error(message.join(", "));
      }
    }

    return Promise.reject(error);
  },
);
