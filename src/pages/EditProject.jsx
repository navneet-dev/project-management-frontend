import DashboardLayout from "../components/DashboardLayout";
import { useEffect, useState } from "react";
import instance from "../axios.js";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function EditProject() {
    const { token } = useAuth();
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProject = async () => {
            try {
                // const token = localStorage.getItem("token");
                const response = await instance.get(`/projects/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setTitle(response.data.name);
                setDescription(response.data.description);
                setDueDate(response.data.due_date);
            } catch (error) {
                console.error("Error in loading project!", error);
            }
        };
        fetchProject();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // const token = localStorage.getItem("token");
            await instance.put(
                `/projects/${id}`,
                {
                    name: title,
                    description: description,
                    due_date: dueDate,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            // alert("Project updated successfully!");
            toast.success("Project updated successfully!");
            navigate("/projects");
        } catch (error) {
            console.error("Error updating project:", error);
            // alert("Failed to updated project. Please try again.");
            toast.error("Failed to updated project. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="w-full bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        Edit Project
                    </h2>

                    <form className="space-y-4 w-full" onSubmit={handleSubmit}>
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                placeholder="Enter project title"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                placeholder="Enter project description"
                                rows="4"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></textarea>
                        </div>

                        {/* Due Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Due Date
                            </label>
                            <input
                                type="date"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md shadow hover:bg-blue-700 transition"
                                disabled={loading}
                            >
                                {loading ? "Updating Project..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
