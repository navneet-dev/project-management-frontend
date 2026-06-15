import DashboardLayout from "../components/DashboardLayout";
import { useEffect, useState } from "react";
import instance from "../axios.js";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function EditTask() {
    const { token } = useAuth();
    const { id } = useParams();
    const [projects, setProjects] = useState([]);
    const [projectId, setProjectId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("pending");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTaskAndProject = async () => {
            try {
                // const token = localStorage.getItem("token");

                //get all projects
                const projectResponse = await instance.get("/projects", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProjects(projectResponse.data);

                //get task
                const taskResponse = await instance.get(`/tasks/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTitle(taskResponse.data.name);
                setDescription(taskResponse.data.description);
                setDueDate(taskResponse.data.due_date);
                setProjectId(taskResponse.data.project_id);
            } catch (err) {
                console.error("Failed to fetch projects.", err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTaskAndProject();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // const token = localStorage.getItem("token");
            await instance.put(
                `/tasks/${id}`,
                {
                    name: title,
                    description: description,
                    due_date: dueDate,
                    project_id: projectId,
                    status: status,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            // alert("Task updated successfully!");
            toast.success("Task updated successfully!");
            navigate("/tasks");
        } catch (error) {
            console.error("Error updating task:", error);
            // alert("Failed to update task. Please try again.");
            toast.error("Failed to updated task. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="w-full bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        Edit Task
                    </h2>

                    <form className="space-y-4 w-full" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Select Project
                            </label>
                            <select
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                                onChange={(e) => setProjectId(e.target.value)}
                            >
                                <option>--Select Project--</option>
                                {projects.map((project) => (
                                    <option key={project.id} value={project.id}>
                                        {project.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter task name"
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
                                placeholder="Enter task description"
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

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Select Status
                            </label>
                            <select
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option>--Select Status--</option>
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md shadow hover:bg-blue-700 transition"
                                disabled={loading}
                            >
                                {loading ? "Updating Task..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
