import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import { Bounce } from "react-awesome-reveal";
import { FaFireAlt } from "react-icons/fa";

const Popular = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "🔥 Popular Books";
    fetch("http://localhost:3000/books/popular")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-10">
      <div className="flex items-center gap-2 mb-8">
        <FaFireAlt className="text-red-500 text-3xl" />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
          Top 6 Most Upvoted Books
        </h1>
      </div>

      {loading ? (
        <p className="text-center text-lg text-gray-600 animate-pulse">
          Loading popular books...
        </p>
      ) : books.length === 0 ? (
        <p className="text-center text-lg text-gray-600">
          No popular books found.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Bounce cascade damping={0.1}>
            {books.map((book) => (
              <Card key={book._id} book={book} />
            ))}
          </Bounce>
        </div>
      )}
    </div>
  );
};

export default Popular;
