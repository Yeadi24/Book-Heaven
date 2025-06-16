import React from "react";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  document.title = "404 Not Found";
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <img
        src="https://i.ibb.co/7x80M2Nw/228438-P28070-739.jpg"
        alt="404 Not Found"
        className="max-w-[800px] max-h-[600px]"
      />
      <button
        onClick={() => navigate("/")}
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Go To Home
      </button>
    </div>
  );
};

export default NotFound;
