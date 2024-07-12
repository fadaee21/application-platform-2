import axios from "axios";

// const baseURL = "http://78.109.199.178:8082/v5";

const BASE_URL = "https://api.platform.nova724.com/v5";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
export default axiosPrivate;
