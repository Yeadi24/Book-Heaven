import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import { FaArrowUp } from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "./Loading";

const BookDetails = () => {
  document.title = "Book Details | Book Heaven";
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [upvotes, setUpvotes] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    fetch(
      `https://server-side-yeadi24-yeadi-24s-projects.vercel.app/books/${id}`,
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        setUpvotes(data.upvote || 0);
      });

    fetch(
      `https://server-side-yeadi24-yeadi-24s-projects.vercel.app/reviews?book_id=${id}`,
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [id]);
  // book upvote
  const handleUpvote = () => {
    if (user?.email === book?.user_email) {
      Swal.fire("You cannot upvote your own book!");
      return;
    }
    fetch(
      `https://server-side-yeadi24-yeadi-24s-projects.vercel.app/upvote/${id}`,

      {
        method: "PATCH",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then(() =>
        setUpvotes((prev) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Upvote has been added",
            showConfirmButton: false,
            timer: 1500,
          });
          return prev + 1;
        })
      );
  };
  // review submit
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const reviewData = {
      book_id: id,
      user_email: user.email,
      review_text: newReview,
      created_at: new Date().toISOString(),
    };
    fetch(`https://server-side-yeadi24-yeadi-24s-projects.vercel.app/reviews`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    })
      .then((res) => res.json())
      .then((data) => {
        setReviews([...reviews, data]);
        setNewReview("");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Review has been added",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  //review delete
  const handleDelete = (reviewId) => {
    fetch(
      `https://server-side-yeadi24-yeadi-24s-projects.vercel.app/reviews/${reviewId}`,
      {
        credentials: "include",
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then(() => {
        setReviews(reviews.filter((r) => r._id !== reviewId));
        Swal.fire("Deleted!", "Your review has been deleted.", "success");
      });
  };
  //review edit
  const handleEditSubmit = (reviewId) => {
    fetch(
      `https://server-side-yeadi24-yeadi-24s-projects.vercel.app/reviews/${reviewId}`,
      {
        credentials: "include",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ review_text: editingText }),
      }
    )
      .then((res) => res.json())
      .then(() => {
        setReviews(
          reviews.map((r) =>
            r._id === reviewId ? { ...r, review_text: editingText } : r
          )
        );
        setEditingReviewId(null);
        Swal.fire("Updated!", "Your review has been updated.", "success");
      });
  };
  //update reading status
  const handleUpdateReadingStatus = () => {
    const newStatus = book.reading_status;
    const updatedBook = { ...book, reading_status: newStatus };
    console.log("Updated Book Object:", updatedBook);
    fetch(
      `https://server-side-yeadi24-yeadi-24s-projects.vercel.app/books/${book._id}`,
      {
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBook),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire("Reading Status has been updated successfully!");
        }
      })
      .catch((err) => {
        console.error("Update failed:", err);
      });
  };

  if (!book) return <Loading></Loading>;

  const categoryColors = {
    Fiction: "from-pink-400 to-pink-600",
    "Non-Fiction": "from-blue-400 to-blue-600",
    Fantasy: "from-purple-400 to-purple-600",
    Motivational: "from-green-400 to-green-600",
  };

  const userAlreadyReviewed = reviews.some(
    (rev) => rev.user_email === user.email
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden transition duration-300 hover:shadow-2xl flex flex-col md:flex-row">
        <img
          src={book.cover_photo}
          alt={book.book_title}
          className="w-full md:w-1/2 h-[500px] object-cover"
        />
        <div className="p-6 space-y-4">
          <h2 className="text-4xl font-bold text-gray-800">
            {book.book_title}
          </h2>
          <p className="text-lg text-gray-600">
            Author: <span className="font-semibold">{book.book_author}</span>
          </p>
          <p className="text-md text-gray-500">Pages: {book.total_page}</p>
          <p className="text-md text-gray-500">Status: {book.reading_status}</p>
          <span
            className={`inline-block text-white px-3 py-1 rounded-full bg-gradient-to-r ${
              categoryColors[book.book_category] || "from-gray-400 to-gray-600"
            }`}
          >
            {book.book_category}
          </span>
          <p className="text-gray-700 pt-4">{book.book_overview}</p>
          <p className="text-sm text-gray-400 pt-2">
            Uploaded by: {book.user_name} ({book.user_email})
          </p>
        </div>
      </div>

      {/* Upvote Section */}
      <div className="bg-gradient-to-r from-indigo-200 to-purple-300 p-6 rounded-2xl shadow-md text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Enjoying this book?
        </h3>
        <button
          onClick={handleUpvote}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
        >
          <FaArrowUp className="text-lg" /> {upvotes} Upvotes
        </button>
      </div>

      {/* Reading Status Update Section */}
      <div className="bg-gradient-to-r from-yellow-200 to-orange-300 p-6 rounded-2xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Manage Your Reading Status
        </h3>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-lg font-semibold text-gray-700">
            Current Status:{" "}
            <span className="px-3 py-1 rounded-full bg-white shadow-md text-indigo-700">
              {book.reading_status}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <select
              value={book.reading_status}
              onChange={(e) =>
                setBook((prev) => ({
                  ...prev,
                  reading_status: e.target.value,
                }))
              }
              className="p-2 rounded-md border border-gray-300 shadow focus:ring-2 focus:ring-indigo-400"
            >
              <option value="Want-to-Read">Want-to-Read</option>
              <option value="Reading">Reading</option>
              <option value="Read">Read</option>
            </select>
            <button
              onClick={handleUpdateReadingStatus}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white p-6 rounded-3xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Reviews</h3>

        {!userAlreadyReviewed && (
          <form onSubmit={handleReviewSubmit} className="mb-6">
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Write your review here..."
              required
            ></textarea>
            <button
              type="submit"
              className="mt-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2 rounded-full hover:from-indigo-600 hover:to-purple-700 transition-all"
            >
              Post Review
            </button>
          </form>
        )}

        <div className="space-y-4">
          {reviews.map((rev) => (
            <div
              key={rev._id}
              className="p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg shadow-md"
            >
              {editingReviewId === rev._id ? (
                <div>
                  <textarea
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <button
                    onClick={() => handleEditSubmit(rev._id)}
                    className="text-sm text-white bg-green-600 px-3 py-1 rounded mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingReviewId(null)}
                    className="text-sm text-white bg-gray-600 px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-gray-700 italic">"{rev.review_text}"</p>
                  <p className="text-sm text-gray-500 mt-1">
                    — {rev.user_email}
                  </p>
                  {user.email === rev.user_email && (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => {
                          setEditingReviewId(rev._id);
                          setEditingText(rev.review_text);
                        }}
                        className="text-sm text-white bg-blue-600 px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(rev._id)}
                        className="text-sm text-white bg-red-600 px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
