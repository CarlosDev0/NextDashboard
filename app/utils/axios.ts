import axios, { AxiosRequestConfig } from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const tokenAPI = process.env.NEXT_PUBLIC_API_KEY;
console.log("Axios L5: " + baseURL);
console.log("Axios L6: " + tokenAPI);
//"x-functions-key": process.env.REACT_APP_FUNCTION_API_KEY,
const axiosServices = axios.create({
  baseURL: baseURL, //baseURL: "http://localhost:5178/api",
  timeout: 30 * 1000,
  headers: {
    "Content-Type": "application/json",
    Authorization: "bearer " + tokenAPI,
  },
});

export default axiosServices;
