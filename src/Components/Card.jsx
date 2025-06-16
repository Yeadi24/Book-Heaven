import React from "react";
import { FaArrowUp } from "react-icons/fa";
import { Link } from "react-router";

const Card = ({ book }) => {
  const { _id, book_title, cover_photo, book_author, book_category, upvote } =
    book;

  const categoryColors = {
    Fiction: "from-pink-400 to-pink-600",
    "Non-Fiction": "from-blue-400 to-blue-600",
    Fantasy: "from-purple-400 to-purple-600",
    Motivational: "from-green-400 to-green-600",
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)] group min-h-[470px] flex flex-col">
      <img
        src={cover_photo}
        alt={book_title}
        className="w-full h-52 object-cover group-hover:brightness-90 transition duration-300"
      />

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex-grow">
          <h2 className="text-2xl font-extrabold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
            {book_title}
          </h2>

          <p className="text-base text-gray-600 mb-3">
            <span className="font-semibold">Author:</span> {book_author}
          </p>

          <span
            className={`inline-block text-base font-semibold text-white px-3 py-1 rounded-full bg-gradient-to-r ${
              categoryColors[book_category] || "from-gray-400 to-gray-600"
            } shadow-md mb-4`}
          >
            {book_category}
          </span>
          <div className="flex items-center gap-2 mb-4">
            <FaArrowUp className="text-pink-600 group-hover:text-pink-800 transition duration-300 text-lg" />
            <span className="text-lg font-semibold text-gray-700">
              {upvote} Upvotes
            </span>
          </div>
        </div>
        <Link
          to={`/book/${_id}`}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2 rounded-full text-center text-base font-semibold shadow-md hover:from-purple-500 hover:to-indigo-600 transition-all duration-300"
        >
          See More
        </Link>
      </div>
    </div>
  );
};

export default Card;
