import React from "react";

import DoneUndoButton from "./buttons/DoneUndoButton";
import EditButton from "./buttons/EditButton";
import DeleteButton from "./buttons/DeleteButton";

export default function TaskActions({
  isCompleted,
  onUpdate,
  onEdit,
  onDelete,
  isAdmin
}) {
  return (
    <div className="flex items-center gap-2">
      <DoneUndoButton isDone={isCompleted} onClick={onUpdate} />
      <EditButton onClick={onEdit} />
      {isAdmin && <DeleteButton onClick={onDelete} />}
    </div>
  );
}
