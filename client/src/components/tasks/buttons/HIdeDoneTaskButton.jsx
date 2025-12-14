import React from 'react';

export default function HideDoneTaskButton({ showCompletedOnly, onClick }) {
    return (
        <label className="flex items-center gap-2 cursor-pointer select-none px-2 py-1">
            <input
                type="checkbox"
                checked={showCompletedOnly}
                onChange={onClick}
                className="w-4 h-4 accent-emerald-500 cursor-pointer"
            />

            <span className="text-sm text-slate-700 dark:text-slate-300">
                Hide Done
            </span>
        </label>

    )
}