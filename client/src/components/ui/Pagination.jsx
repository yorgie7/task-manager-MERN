import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button"; // same folder

/**
 * Props:
 * - page (number) current 1-based page
 * - pageCount (number) total pages
 * - onPageChange(newPage) callback
 */

export default function Pagination({ page, pageCount, onPageChange }) {
  if (!page || pageCount <= 1) return null;

  const canPrev = page > 1;
  const canNext = page < pageCount;

  const getPages = () => {
    const maxButtons = 5;
    const half = Math.floor(maxButtons / 2);
    let start = Math.max(1, page - half);
    let end = Math.min(pageCount, start + maxButtons - 1);
    start = Math.max(1, end - maxButtons + 1);
    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <nav className="flex items-center justify-center gap-2 mt-4" aria-label="Pagination">
      <Button
        onClick={() => canPrev && onPageChange(page - 1)}
        disabled={!canPrev}
        variant="outline"
        size="sm"
        className="inline-flex items-center justify-center"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {getPages().map((p) => {
        const active = p === page;
        return (
          <Button
            key={p}
            onClick={() => onPageChange(p)}
            size="sm"
            className={`px-3 py-1 rounded-md ${active ? "bg-slate-900 text-white dark:bg-slate-200 dark:text-slate-900 border-slate-900 dark:border-slate-200" : "bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50"}`}
            aria-current={active ? "page" : undefined}
          >
            {p}
          </Button>
        );
      })}

      <Button
        onClick={() => canNext && onPageChange(page + 1)}
        disabled={!canNext}
        variant="outline"
        size="sm"
        className="inline-flex items-center justify-center"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </nav>
  );
}
