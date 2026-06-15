import instance from "../axios.js";

//handle login
export const loginService = async (credentials) => {
    const response = await instance.post("/login", credentials);
    return response;
};

//handle register
export const registerService = async (userData) => {
    const response = await instance.post("/register", userData);
    return response;
};

//handle logout
export const logoutService = async (token) => {
    const response = await instance.post(
        "/logout",
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
    return response;
};
