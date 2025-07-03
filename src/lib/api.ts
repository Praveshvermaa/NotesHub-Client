import axios from "axios";

const api = axios.create({
  baseURL: "https://noteshub-server.onrender.com/api",//https://noteshub-backend-ptnu.onrender.com
  withCredentials: true, 
});

export default api;
// 