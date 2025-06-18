import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import { Bounce, Flip, Slide } from "react-awesome-reveal";
import { FaFireAlt } from "react-icons/fa";

const NonFiction = ({ category = "Non-Fiction" }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `${category} | Book Heaven`;
    fetch("https://server-side-delta-two.vercel.app/books")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const filteredBooks = data
          .filter((book) => book.book_category === category)
          .sort((a, b) => b.upvote - a.upvote)
          .slice(0, 6);
        setBooks(filteredBooks);
        setLoading(false);
      })
      .catch((err) => {
        console.error(`Error fetching ${category} books:`, err);
        setLoading(false);
      });
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-10">
      <div className="flex items-center gap-2 mb-8">
        <FaFireAlt className="text-red-500 text-3xl" />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
          {category}
        </h1>
      </div>

      {loading ? (
        <p className="text-center text-lg text-gray-600 animate-pulse">
          Loading {category.toLowerCase()} books...
        </p>
      ) : books.length === 0 ? (
        <p className="text-center text-lg text-gray-600">
          No {category.toLowerCase()} books found.
        </p>
      ) : (
        <Slide triggerOnce={true} duration={1200} delay={300} direction="left">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <Card key={book._id} book={book} />
            ))}
          </div>
        </Slide>
      )}
    </div>
  );
};

export default NonFiction;
