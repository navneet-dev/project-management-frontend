import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useParams } from "react-router-dom";
import instance from "../axios";
import { useAuth } from "../context/AuthContext";

export default function ProjectDetails() {
    const { token } = useAuth();
    const { id } = useParams();
    const [projectDetails, setProjectDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    //fetch project details
    useEffect(() => {
        const fetchProject = async () => {
            try {
                // const token = localStorage.getItem("token");
                const response = await instance.get(`/projects/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setProjectDetails(response.data);
            } catch (error) {
                console.error("Error in loading project!", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    return (
        <DashboardLayout>
            <div className="p-6 bg-gray-50 min-h-screen">
                {/* Project Info Card */}
                <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        {projectDetails?.name}
                    </h2>
                    <p className="text-gray-600 mb-4">
                        {projectDetails?.description}
                    </p>
                    <div className="flex flex-wrap gap-6">
                        <div>
                            <span className="text-sm text-gray-500">
                                Due Date
                            </span>
                            <p className="text-gray-800 font-medium">
                                {projectDetails?.due_date}
                            </p>
                        </div>
                        <div>
                            <span className="text-sm text-gray-500">
                                Status
                            </span>
                            <p className="text-green-600 font-medium">
                                In Progress
                            </p>
                        </div>
                    </div>
                </div>

                {projectDetails.tasks?.length === 0 ? (
                    <p>No Task Added Yet</p>
                ) : (
                    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        S.No
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Task Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Due Date
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {projectDetails?.tasks?.map((task, index) => (
                                    <tr
                                        className="hover:bg-gray-50"
                                        key={task.id}
                                    >
                                        <td className="px-6 py-4">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {task.name}
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">
                                            {task.description}
                                        </td>
                                        <td className="px-6 py-4 text-yellow-600 font-medium">
                                            {task.status}
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">
                                            {task.due_date}
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
