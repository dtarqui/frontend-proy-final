import React from "react";

interface TaskCardProps {
  title: string;
  description: string;
  status: string;
  dueDate: string;
  onDelete: () => void;
  onEdit: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  status,
  dueDate,
  onDelete,
  onEdit,
}) => {
  const statusInSpanish =
    status === "completed"
      ? "Completada"
      : status === "in-progress"
      ? "En progreso"
      : "Pendiente";

  const statusClass =
    status === "completed"
      ? "status-completed"
      : status === "in-progress"
      ? "status-in-progress"
      : "status-pending";

  // Format the due date
  const formattedDueDate = new Date(dueDate).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="task-card">
      <h3 className="task-title">{title}</h3>
      <p className="task-description">{description}</p>
      <span className={`task-status ${statusClass}`}>{statusInSpanish}</span>
      <span className="task-due-date">
        Fecha de vencimiento: {formattedDueDate}
      </span>
      <div className="task-actions">
        <button onClick={onEdit} className="task-button edit-button">
          Editar
        </button>
        <button onClick={onDelete} className="task-button delete-button">
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
