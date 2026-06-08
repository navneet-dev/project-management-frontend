import { Link, useNavigate } from "react-router-dom";
import instance from "../axios.js";
import { useState } from "react";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle registration logic here
        // You can collect form data and send it to the backend using instance.post("/register", { ... })
        setLoading(true);
        try {
            const response = await instance.post("/register", {
                name,
                email,
                password,
            });
            setMessage("Registration successful!");
            // You can redirect the user or perform other actions here
            navigate("/login");
        } catch (error) {
            // console.error(
            //     "Registration failed:",
            //     error.response?.data?.errors?.email[0] || error.message,
            // );
            setMessage(
                error.response?.data?.message ||
                    "Registration failed. Please try again.",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form
                className="bg-white text-gray-500 w-full max-w-[340px] mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Sign Up
                </h2>

                <input
                    id="name"
                    className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    id="email"
                    className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    id="password"
                    className="w-full border mt-1 bg-indigo-500/5 mb-7 border-gray-500/10 outline-none rounded py-2.5 px-3"
                    type="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    avlue={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium"
                    disabled={loading}
                    type="submit"
                >
                    {loading ? "Creating Account..." : "Create Account"}
                </button>

                {message && (
                    <p className="text-red-500 text-center mt-2">{message}</p>
                )}

                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 underline">
                        Log In
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Register;
