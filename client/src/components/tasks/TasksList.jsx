import React, { useState, useMemo } from "react";
import TaskCard from "./TaskCard";
import Pagination from "../ui/Pagination";

export default function TasksList({
  tasks = [],
  isAdmin = false,
  onUpdate,
  onDelete,
  onEdit,
  titleColor = "indigo",
  pageSize = 5,
}) {


  const [page, setPage] = useState(1);

  const pageCount = Math.max(1, Math.ceil(tasks.length / pageSize));

  // If tasks shrink, clamp page
  if (page > pageCount) setPage(pageCount);

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return tasks.slice(start, start + pageSize);
  }, [tasks, page, pageSize]);

  // map friendly color names to Tailwind classes (text + muted fallback)

  if (!tasks || tasks.length === 0) {
    return (
      <div
        className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow text-center"
        role="status"
        aria-live="polite"
      >
        No tasks found.
      </div>
    );
  }

  return (<>
    <ul className="space-y-3">
      {
        pageItems.map((t) => {
          return <TaskCard
            isAdmin={isAdmin}
            task={t}
            onEdit={onEdit}
            onDelete={onDelete}
            onUpdate={onUpdate}
            titleColor={titleColor} />
        })
      }
    </ul>

    <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
  </>
  );
}
