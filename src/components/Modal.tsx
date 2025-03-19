import React, { useState, useEffect } from "react";
import { Task, TaskStatus } from "../types";

interface ModalProps {
  isOpen: boolean;
  mode: "create" | "edit";
  task?: Task;
  onClose: () => void;
  onConfirm: (task: Partial<Task>) => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  mode,
  task,
  onClose,
  onConfirm,
}) => {
  const [editedTask, setEditedTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    status: TaskStatus.Pending,
    dueDate: "",
  });

  useEffect(() => {
    if (mode === "edit" && task) {
      setEditedTask({
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: formatDate(task.dueDate),
      });
    } else if (mode === "create") {
      setEditedTask({
        title: "",
        description: "",
        status: TaskStatus.Pending,
        dueDate: "",
      });
    }
  }, [mode, task]);

  const formatDate = (date: string | undefined): string => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{mode === "create" ? "Crear Nueva Tarea" : "Editar Tarea"}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onConfirm(editedTask);
          }}
        >
          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input
              type="text"
              id="title"
              value={editedTask.title || ""}
              onChange={(e) =>
                setEditedTask({ ...editedTask, title: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              value={editedTask.description || ""}
              onChange={(e) =>
                setEditedTask({
                  ...editedTask,
                  description: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Estado</label>
            <select
              id="status"
              value={editedTask.status || ""}
              onChange={(e) =>
                setEditedTask({
                  ...editedTask,
                  status: e.target.value as TaskStatus,
                })
              }
            >
              <option value={TaskStatus.Pending}>Pendiente</option>
              <option value={TaskStatus.InProgress}>En Progreso</option>
              <option value={TaskStatus.Completed}>Completada</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Fecha de Vencimiento</label>
            <input
              type="date"
              id="dueDate"
              value={editedTask.dueDate || ""}
              onChange={(e) =>
                setEditedTask({ ...editedTask, dueDate: e.target.value })
              }
              required
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="confirm-button">
              {mode === "create" ? "Crear" : "Guardar"}
            </button>
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
