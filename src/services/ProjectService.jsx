import instance from "../axios";

//get all the projects
export const getAllProjects = async (token) => {
    try {
        const response = await instance.get("/projects", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (err) {
        console.error("Unable to fetch projects!", err);
    }
};

//get project details with task as well
export const getProjectDetails = async (id, token) => {
    try {
        // const token = localStorage.getItem("token");
        const response = await instance.get(`/projects/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        console.error("Error in loading project!", error);
    }
};

//delete a project
export const deleteProject = async (id, token) => {
    try {
        const response = await instance.delete(`projects/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        console.error("Error while deleting project: ", error);
    }
};
