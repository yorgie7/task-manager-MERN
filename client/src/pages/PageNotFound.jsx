import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-6">
      <h1 className="text-9xl font-extrabold text-gray-300 dark:text-gray-700 select-none">
        404
      </h1>

      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">
        Page Not Found
      </h2>

      <p className="text-gray-600 dark:text-gray-400 mt-2 text-center max-w-md">
        The page you're looking for doesn’t exist.
      </p>

      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
      >
        <ArrowLeft size={18} />
        Go back Home
      </Link>
    </div>
  );
}
