import React, { useState, useMemo } from "react";
import TaskCard from "./TaskCard";
import Pagination from "../ui/Pagination";
import FullPageSpinner from "../ui/FullpageSpinner";

export default function TasksList({
  loading = false,
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

  if (page > pageCount) setPage(pageCount);

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return tasks.slice(start, start + pageSize);
  }, [tasks, page, pageSize]);

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

  if (loading) return <FullPageSpinner message="Loading Tasks" />
  return (<>
    <ul className="space-y-3">
      {
        pageItems.map((t) => {
          return <TaskCard
          key={t._id}
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
