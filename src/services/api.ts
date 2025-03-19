import axios from "axios";
import { Task } from "../types";

const API_BASE_URL = "https://backend-proy-final.onrender.com/api"; // Replace with your actual API base URL

const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

export const fetchTasks = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const fetchUserData = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const authenticateUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error authenticating user:", error);
    throw error;
  }
};

// Fetch a task by ID
export const fetchTaskById = async (id: number) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching task with ID ${id}:`, error);
    throw error;
  }
};

// Update a task by ID
export const updateTaskById = async (
  id: number,
  updatedTask: Partial<Task>
) => {
  try {
    const token = getAuthToken();
    const response = await axios.put(
      `${API_BASE_URL}/tasks/${id}`,
      updatedTask,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating task with ID ${id}:`, error);
    throw error;
  }
};

// Delete a task by ID
export const deleteTaskById = async (id: number) => {
  try {
    const token = getAuthToken();
    const response = await axios.delete(`${API_BASE_URL}/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting task with ID ${id}:`, error);
    throw error;
  }
};

export const createTask = async (task: Partial<Task>) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(`${API_BASE_URL}/tasks`, task, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};
