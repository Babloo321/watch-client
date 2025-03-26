import axios from "axios";
<<<<<<< HEAD
// const BASE_URL = "https://watch-backend-two.vercel.app/api/v1/"
const BASE_URL = "http://localhost:5050/api/v1";
// const BASE_URL = "http://localhost:4000/api/v1";
=======
const BASE_URL = "https://watch-backend-udj0.onrender.com/api/v1";
// const BASE_URL = "http://localhost:5050/api/v1";
>>>>>>> dc74cb423a6af4cd6701984dc59e936adeff93c6
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


