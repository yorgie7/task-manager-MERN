import React from "react";

export default function FullPageSpinner({ message = "Loading...", show = true, description = "Thank you for waiting..." }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-black/70 z-50">
            <div className="flex flex-col items-center p-5 rounded-xl bg-white dark:bg-gray-900 shadow-md border border-gray-200 dark:border-gray-700">
                <div className="h-10 w-10 border-4 border-gray-300 dark:border-gray-600 border-t-gray-800 dark:border-t-white rounded-full animate-spin"></div>
                <p className="text-sm mt-3 text-gray-700 dark:text-gray-200 font-medium">
                    {message}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
            </div>
        </div>
    );
}
