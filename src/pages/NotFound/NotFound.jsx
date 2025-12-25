import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-center px-4">
      <h1 className="text-7xl font-bold text-blue-600">404</h1>

      <h2 className="text-2xl font-semibold mt-4 text-gray-800 dark:text-gray-200">
        Page Not Found
      </h2>

      <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-md">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
