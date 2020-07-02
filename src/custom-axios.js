import axios from "axios";

const token = localStorage.getItem("token");
const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/api/v1"
    : "http://murika.herokuapp.com/api/v1";
console.log(token);
const instance = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: token,
  },
});

export default instance;
