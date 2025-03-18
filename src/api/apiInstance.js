import axios from "axios";
const BASE_URL = "https://watch-backend-two.vercel.app/api/v1"
// const BASE_URL = "http://localhost:5050/api/v1/";
const API = axios.create({
  baseURL: BASE_URL
});

export default API;
export const AxiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});


