import axios from "axios";
export default axios.create({
  baseURL: sessionStorage.getItem("base_server_url"),
  headers: {
    Authorization: "Bearer " + sessionStorage.getItem("token"),
  },
});
