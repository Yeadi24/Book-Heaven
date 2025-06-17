import React, { useState } from "react";
import { useLoaderData } from "react-router";
import Card from "./Card";
import { Flip } from "react-awesome-reveal";

const BookShelf = () => {
  const books = useLoaderData();
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  document.title = "Book Shelf";

  const filteredBooks = books
    .filter((book) =>
      filter === "All" ? true : book.reading_status === filter
    )
    .filter(
      (book) =>
        book.book_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.book_author.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Flip direction="horizontal" triggerOnce>
      <div className="py-10 px-4 sm:px-6 lg:px-12 flex flex-col gap-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600">
          Explore Your Book Shelf 📚
        </h1>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <select
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Reading">Reading</option>
            <option value="Read">Read</option>
            <option value="Want-to-Read">Want-to-Read</option>
          </select>

          <input
            type="text"
            placeholder="Search by title or author..."
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 shadow-sm focus:outline-none focus:ring focus:border-blue-300 w-full sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <Card key={book._id} book={book} />
          ))}
        </div>
      </div>
    </Flip>
  );
};

export default BookShelf;
