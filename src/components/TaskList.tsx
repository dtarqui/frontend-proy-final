import React, { useState } from "react";
import TaskCard from "./TaskCard";
import Modal from "./Modal"; // Import the reusable Modal component
import { Task } from "../types";
import { deleteTaskById, updateTaskById } from "../services/api";

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"edit" | "delete" | null>(null);
  const [taskToModify, setTaskToModify] = useState<Task | null>(null);

  const handleEditClick = (task: Task) => {
    setTaskToModify(task);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleDeleteClick = (task: Task) => {
    setTaskToModify(task);
    setModalMode("delete");
    setIsModalOpen(true);
  };

  const confirmEdit = async (updatedTask: Partial<Task>) => {
    if (taskToModify) {
      try {
        const updated = await updateTaskById(taskToModify.id, updatedTask);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskToModify.id ? updated : task
          )
        );
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
    closeModal();
  };

  const confirmDelete = async () => {
    if (taskToModify) {
      try {
        await deleteTaskById(taskToModify.id);
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task.id !== taskToModify.id)
        );
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMode(null);
    setTaskToModify(null);
  };

  return (
    <div>
      <div className="task-list-grid">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            description={task.description}
            status={task.status}
            dueDate={task.dueDate}
            onEdit={() => handleEditClick(task)} // Open modal in "edit" mode
            onDelete={() => handleDeleteClick(task)} // Open modal in "delete" mode
          />
        ))}
      </div>

      {isModalOpen && modalMode === "edit" && (
        <Modal
          isOpen={isModalOpen}
          mode="edit"
          task={taskToModify || undefined}
          onClose={closeModal}
          onConfirm={confirmEdit} // Handle task editing
        />
      )}

      {isModalOpen && modalMode === "delete" && (
        <div className="modal-overlay">
          <div className="modal">
            <p>¿Estás seguro de que deseas eliminar esta tarea?</p>
            <p>
              <strong>{taskToModify?.title}</strong>
            </p>
            <div className="modal-actions">
              <button onClick={confirmDelete} className="confirm-button">
                Confirmar
              </button>
              <button onClick={closeModal} className="cancel-button">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
