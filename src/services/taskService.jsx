import instance from "../axios";

//get all the tasks
export const getTasks = async (token) => {
    try {
        const response = await instance.get("/tasks", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error("Failed to fetch tasks.", error.message);
    }
};

//create a task
export const createTask = async (taskData, token) => {
    try {
        const response = await instance.post("/tasks", taskData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        console.error("Error adding task:", error);
    }
};

//update a task
export const updateTask = async (id, taskData, token) => {
    try {
        const response = await instance.put(`/tasks/${id}`, taskData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error("Error updating task:", error);
    }
};

//delete a task
export const deleteTask = async (id, token) => {
    try {
        const response = await instance.delete(`tasks/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        console.error("Error while deleting task: ", error);
    }
};

//get a single task
export const getSingleTask = async (id, token) => {
    try {
        const taskResponse = await instance.get(`/tasks/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return taskResponse;
    } catch (error) {
        console.error("Failed to fetch projects.", err.message);
    }
};
