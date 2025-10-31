import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-200 via-orange-200 to-yellow-200 dark:from-red-900 dark:via-orange-900 dark:to-yellow-900">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">404</h1>
        <p className="mb-4 text-xl text-gray-800 dark:text-gray-200">Oops! Page not found</p>
        <a href="/" className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-600 font-semibold">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
