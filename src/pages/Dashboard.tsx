import React, { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import Modal from "../components/Modal"; // Import the reusable Modal component
import { fetchTasks, createTask } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Task } from "../types";
import "../styles/Dashboard.css";

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    search: "",
    startDate: "",
    endDate: "",
  });
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
      setTasks((prevTasks) => [...prevTasks, createdTask.task]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
    setIsModalOpen(false);
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    try {
      const filteredTasks = await fetchTasks(
        filters.status,
        filters.search,
        filters.startDate,
        filters.endDate
      );
      setTasks(filteredTasks);
    } catch (error) {
      console.error("Error fetching filtered tasks:", error);
    }
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
        {/* Filters Section */}
        <div className="filters-container">
          <h2>Filtros</h2>
          <div className="filters-card">
            <div className="form-group">
              <label htmlFor="status">Estado</label>
              <select
                id="status"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="">Todos</option>
                <option value="pending">Pendiente</option>
                <option value="in-progress">En progreso</option>
                <option value="completed">Completado</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="search">Buscar</label>
              <input
                id="search"
                name="search"
                type="text"
                placeholder="Buscar por título o descripción"
                value={filters.search}
                onChange={handleFilterChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="startDate">Fecha de inicio</label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                value={filters.startDate}
                onChange={handleFilterChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">Fecha de fin</label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                value={filters.endDate}
                onChange={handleFilterChange}
              />
            </div>

            <button className="search-button" onClick={handleSearch}>
              Buscar
            </button>
          </div>
        </div>

        {/* Stats Section */}
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

        {/* Task List Section */}
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
