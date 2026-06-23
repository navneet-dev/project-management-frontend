import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { deleteTask, getTasks } from "../services/taskService";

export default function Tasks() {
    const { token } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await getTasks(token);
                setTasks(response.data);
            } catch (error) {
                setError("Failed to fetch tasks.", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [token]);

    //delete project
    const handleDelete = async (id) => {
        const deleteConfirmation = confirm("Do you want to delete this Task?");
        if (!deleteConfirmation) return;

        try {
            await deleteTask(id, token);
            setTasks(tasks.filter((task) => task.id !== id));
            toast.success("Task Deleted Successfully!");
        } catch (e) {
            console.error("Unable to Delete Task", e);
            toast.error("Unable to Delete Task", e);
        }
    };

    return (
        <DashboardLayout>
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Tasks
                    </h1>
                    <Link
                        to="/task/add"
                        className="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition"
                    >
                        Add Task
                    </Link>
                </div>

                {loading ? (
                    <p className="text-gray-500">Loading tasks...</p>
                ) : error ? (
                    <p className="text-red-500">Error: {error}</p>
                ) : tasks.length === 0 ? (
                    <p className="text-gray-500">No tasks found.</p>
                ) : (
                    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                        <table className="min-w-[960px] w-full table-fixed divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="w-16 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        S.No
                                    </th>
                                    <th className="w-40 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Project Name
                                    </th>
                                    <th className="w-44 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Task Name
                                    </th>
                                    <th className="w-80 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Due Date
                                    </th>
                                    <th className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="w-52 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {tasks.map((task, index) => (
                                    <tr
                                        className="hover:bg-gray-50"
                                        key={task.id}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap align-top">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 align-top break-words text-gray-700">
                                            {task.project.name}
                                        </td>
                                        <td className="px-6 py-4 align-top break-words font-medium text-gray-900">
                                            {task.name}
                                        </td>
                                        <td className="px-6 py-4 align-top break-words text-gray-700">
                                            {task.description}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap align-top text-gray-700">
                                            {task.due_date}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap align-top text-gray-700">
                                            {task.status}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap align-top">
                                            <div className="flex flex-wrap gap-2">
                                                <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition">
                                                    View
                                                </button>
                                                <Link
                                                    to={`/task/edit/${task.id}`}
                                                    className="px-3 py-1 bg-yellow-400 text-white text-sm rounded hover:bg-yellow-500 transition"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(task.id)
                                                    }
                                                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                                                >
                                                    Delete
                                                </button>
                                            </div>
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
