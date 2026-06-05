import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../axios.js";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle login logic here
        // console.log({ email, password });
        setLoading(true);
        try {
            const response = await instance.post("/login", {
                email,
                password,
            });
            // console.log("Login successful:", response.data.message);
            const token = response.data.access_token;
            localStorage.setItem("token", token);
            // console.log("User data:", response.data.user);

            setMessage("Login successful!");

            // You can redirect the user or perform other actions here
            navigate("/dashboard");
        } catch (error) {
            // console.error(
            //     "Login failed:",
            //     error.response?.data || error.message,
            // );
            setMessage(
                error.response?.data?.message ||
                    "Login failed. Please try again.",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                className="bg-white text-gray-500 max-w-[350px] mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                    Login Now
                </h2>
                <input
                    id="email"
                    className="w-full border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    id="password"
                    className="w-full border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div className="text-right py-4 hidden">
                    <a className="text-blue-600 underline" href="#">
                        Forgot Password
                    </a>
                </div>
                <button
                    type="submit"
                    className="w-full my-3 bg-indigo-500 hover:bg-indigo-600/90 active:scale-95 transition py-2.5 rounded-full text-white"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Log in"}
                </button>
                {message && (
                    <p className="text-red-500 text-center mt-2">{message}</p>
                )}
                <p className="text-center mt-4">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-blue-500 underline">
                        Signup Now
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
