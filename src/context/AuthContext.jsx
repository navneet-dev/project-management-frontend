import { createContext, useContext, useState, useEffect } from "react";
import { logoutService } from "../services/AuthService";

//create context
const AuthContext = createContext();

//provide context provider
export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [user, setUser] = useState(localStorage.getItem("username") || null);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }

        if (user) {
            localStorage.setItem("username", user);
        } else {
            localStorage.removeItem("username");
        }
    }, [token, user]);

    const login = (token, user) => {
        setToken(token);
        setUser(user);
    };

    const logout = async () => {
        const response = await logoutService(token);
        if (response) {
            setToken(null);
            setUser(null);
        }
        return response;
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

//custom hook for easier use
export function useAuth() {
    return useContext(AuthContext);
}
