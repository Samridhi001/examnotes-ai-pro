import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

export function getApiErrorMessage(error) {
  return (
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    "Something went wrong"
  );
}