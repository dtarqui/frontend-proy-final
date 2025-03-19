import React, { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import Modal from "../components/Modal"; // Import the reusable Modal component
import { fetchTasks, createTask } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Task } from "../types";

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    const getTasks = async () => {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    };

    getTasks();
  }, []);

  const handleAddTask = async (newTask: Partial<Task>) => {
    try {
      const createdTask = await createTask(newTask);
      console.log(newTask, createdTask, "newTask");

      setTasks((prevTasks) => [...prevTasks, createdTask.task]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="header-content">
            <h1>Dashboard</h1>
            <button onClick={logout}>Cerrar sesión</button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="stats-container">
          <div className="stat-card">
            <h3>Pendiente</h3>
            <p className="text-yellow-600">
              {tasks.filter((t) => t.status === "pending").length}
            </p>
          </div>
          <div className="stat-card">
            <h3>En progreso</h3>
            <p className="text-blue-600">
              {tasks.filter((t) => t.status === "in-progress").length}
            </p>
          </div>
          <div className="stat-card">
            <h3>Completado</h3>
            <p className="text-green-600">
              {tasks.filter((t) => t.status === "completed").length}
            </p>
          </div>
          <div className="stat-card">
            <h3>Total</h3>
            <p>{tasks.length}</p>
          </div>
        </div>

        <div className="task-list-container">
          <div className="task-list-header">
            <h2>Tareas</h2>
            <button
              className="add-task-button"
              onClick={() => setIsModalOpen(true)} // Open the modal in "create" mode
            >
              Nueva tarea
            </button>
          </div>
        </div>

        <TaskList tasks={tasks} setTasks={setTasks} />

        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            mode="create" // Set the mode to "create"
            onClose={() => setIsModalOpen(false)} // Close the modal
            onConfirm={handleAddTask} // Handle adding a new task
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
