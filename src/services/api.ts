import axios from "axios";
import { Task } from "../types";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3001/api";

const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

export const fetchTasks = async (
  status?: string,
  search?: string,
  startDate?: string,
  endDate?: string
) => {
  try {
    const token = getAuthToken();

    // Build query parameters dynamically
    const params: Record<string, string> = {};
    if (status) params.status = status;
    if (search) params.search = search;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    const response = await axios.get(`${API_BASE_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const registerUser = async (
  username: string,
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      username,
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
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
