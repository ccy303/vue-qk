import axios from "./axios";
export default {
    getUser: () => axios.get("/api/login")
};
