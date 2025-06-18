import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Contexts/AuthContext";
import { Bounce } from "react-awesome-reveal";
import { FaArrowUp } from "react-icons/fa";

const MyBooks = () => {
  document.title = "My Books";
  const { user } = useContext(AuthContext);

  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://server-side-delta-two.vercel.app/mybooks?email=${user.email}`,
        {
          credentials: "include",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setBooks(data);
        });
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://server-side-delta-two.vercel.app/books/${id}`, {
          credentials: "include",
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setBooks(books.filter((book) => book._id !== id));
              Swal.fire("Deleted!", "Your book has been deleted.", "success");
            }
          });
      }
    });
  };

  const categoryColors = {
    Fiction: "from-pink-400 to-pink-600",
    "Non-Fiction": "from-blue-400 to-blue-600",
    Fantasy: "from-purple-400 to-purple-600",
    Motivational: "from-green-400 to-green-600",
  };

  return (
    <Bounce triggerOnce>
      <div className="p-10">
        <h1 className="text-4xl font-bold text-center mb-10">My Books</h1>

        {books.length === 0 ? (
          <div className="flex items-center justify-center h-60">
            <h2 className="text-5xl font-extrabold text-red-500 animate-pulse">
              No Book Found !!!
            </h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {books.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)] group min-h-[800px] flex flex-col"
              >
                <img
                  src={book.cover_photo}
                  alt={book.book_title}
                  className="w-full h-[700px] object-cover group-hover:brightness-90 transition duration-300"
                />

                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h2 className="text-2xl font-extrabold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                      {book.book_title}
                    </h2>

                    <p className="text-base text-gray-600 mb-3">
                      <span className="font-semibold">Author:</span>{" "}
                      {book.book_author}
                    </p>

                    <span
                      className={`inline-block text-base font-semibold text-white px-3 py-1 rounded-full bg-gradient-to-r ${
                        categoryColors[book.book_category] ||
                        "from-gray-400 to-gray-600"
                      } shadow-md mb-4`}
                    >
                      {book.book_category}
                    </span>

                    <div className="flex items-center gap-2 mb-4">
                      <FaArrowUp className="text-pink-600 group-hover:text-pink-800 transition duration-300 text-lg" />
                      <span className="text-lg font-semibold text-gray-700">
                        {book.upvote} Upvotes
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => navigate(`/updateBook/${book._id}`)}
                      className="bg-green-500 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:bg-green-600 transition-all duration-300"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="bg-red-500 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:bg-red-600 transition-all duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Bounce>
  );
};

export default MyBooks;
