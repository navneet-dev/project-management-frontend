import axios from "axios";

const instance = axios.create({
    baseURL: "https://project-management.navneetcodes.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;
