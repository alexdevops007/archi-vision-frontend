import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://hydro-contract-backend.vercel.app/api"
    : "http://localhost:3000/api";

const apiClient = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 401) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       window.location.href = "/login"; // Redirection après réception de 401
//     }
//     return Promise.reject(error);
//   }
// );

export default apiClient;
