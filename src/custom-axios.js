import axios from "axios";

const token = localStorage.getItem("token");
const baseURL = "http://murika.herokuapp.com/api/v1";
const instance = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: token,
    "Access-Control-Allow-Credentials": "*",
  },
});

export default instance;
