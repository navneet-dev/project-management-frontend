import DashboardLayout from "../components/DashboardLayout";
import { useEffect, useState } from "react";
import instance from "../axios.js";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await instance.get("/projects", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProjects(response.data);
            } catch (err) {
                setError("Failed to fetch projects.", err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    //delete project
    const handleDelete = async (id) => {
        const deleteConfirmation = confirm(
            "Do you want to delete this Project?",
        );
        if (!deleteConfirmation) return;

        try {
            const token = localStorage.getItem("token");
            await instance.delete(`projects/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setProjects(projects.filter((project) => project.id !== id));
            // alert("Project Deleted Successfully");
            toast.success("Project Deleted Successfully!");
        } catch (e) {
            console.error("Unable to Delete", e);
            toast.error("Unable to Delete", e);
        }
    };

    return (
        <DashboardLayout>
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                        Projects
                    </h1>
                    <Link
                        to="/project/add"
                        className="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition"
                    >
                        Add Project
                    </Link>
                </div>

                {loading ? (
                    <p className="text-gray-500">Loading projects...</p>
                ) : error ? (
                    <p className="text-red-500">Error: {error}</p>
                ) : projects.length === 0 ? (
                    <p className="text-gray-500">No projects found.</p>
                ) : (
                    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        S.No
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Due Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {projects.map((project, index) => (
                                    <tr
                                        key={project.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                            {project.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                            {project.description}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                            {project.due_date}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                                            <Link
                                                to={`/project-details/${project.id}`}
                                                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
                                            >
                                                View
                                            </Link>
                                            <Link
                                                to={`/project/edit/${project.id}`}
                                                className="px-3 py-1 bg-yellow-400 text-white text-sm rounded hover:bg-yellow-500 transition"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(project.id)
                                                }
                                                className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
