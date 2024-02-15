import axios from "axios";
export const BASE_URL = "http://localhost:8000/api/v1";

// export const BASE_URL = "https://cheerful-shirt.cyclic.app/api/v1";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
