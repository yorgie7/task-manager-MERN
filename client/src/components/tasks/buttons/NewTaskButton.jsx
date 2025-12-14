import React from "react";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";

export default function NewTaskButton({ onClick }) {
  return (
    <Button
      onClick={onClick}
      className="bg-green-600 hover:bg-green-700 text-white dark:bg-green-500 dark:hover:bg-green-600 dark:text-black px-3 py-1.5 gap-2 rounded-sm"

    >
      <Plus className="h-4 w-4" />
      <span className="hidden sm:inline">New Task</span>
    </Button>
  );
}
