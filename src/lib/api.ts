import axios from "axios";

const api = axios.create({
  baseURL: "https://noteshub-server-47sm.onrender.com/api",
  //https://noteshub-server-47sm.onrender.com // mine
  withCredentials: true, 
});

export default api;
// 