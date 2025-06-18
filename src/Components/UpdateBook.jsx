import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Contexts/AuthContext";
import { Zoom } from "react-awesome-reveal";

const UpdateBook = () => {
  document.title = "Update Book | Book Heaven";
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const name = user?.displayName;
  const { id } = useParams();
  const navigate = useNavigate();

  const [bookData, setBookData] = useState(null);

  useEffect(() => {
    fetch(
      `https://server-side-yeadi24-yeadi-24s-projects.vercel.app/books/${id}`,
      { credentials: "include" }
    )
      .then((res) => res.json())
      .then((data) => setBookData(data))
      .catch((err) => console.error("Error fetching book:", err));
  }, [id]);

  const handleUpdateBook = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedBook = Object.fromEntries(formData.entries());

    fetch(
      `https://server-side-yeadi24-yeadi-24s-projects.vercel.app/books/${id}`,
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
          Swal.fire("Book has been updated successfully!");
          navigate("/mybooks");
        }
      })
      .catch((err) => {
        console.error("Update failed:", err);
      });
  };

  if (!bookData) {
    return <div className="text-center p-20 text-3xl">Loading...</div>;
  }

  return (
    <Zoom triggerOnce>
      <div className="px-4 sm:px-8 md:px-16 lg:px-32 py-16">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-purple-700 mb-4 drop-shadow-lg">
            Update Book
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Make changes to your book and save to update the shelf.
          </p>
        </div>

        <form onSubmit={handleUpdateBook}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <fieldset className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 border border-purple-300 rounded-xl p-4 shadow-md">
              <label className="label font-semibold text-gray-800">
                User Email
              </label>
              <input
                type="email"
                className="input input-bordered w-full"
                name="user_email"
                defaultValue={email}
                readOnly
              />
            </fieldset>

            <fieldset className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 border border-purple-300 rounded-xl p-4 shadow-md">
              <label className="label font-semibold text-gray-800">
                User Name
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                name="user_name"
                defaultValue={name}
                readOnly
              />
            </fieldset>

            <fieldset className="bg-yellow-100 border border-yellow-300 rounded-xl p-4 shadow-md">
              <label className="label font-semibold">Book Title</label>
              <input
                type="text"
                className="input input-bordered w-full"
                name="book_title"
                defaultValue={bookData.book_title}
              />
            </fieldset>

            <fieldset className="bg-green-100 border border-green-300 rounded-xl p-4 shadow-md">
              <label className="label font-semibold">Cover Photo URL</label>
              <input
                type="text"
                className="input input-bordered w-full"
                name="cover_photo"
                defaultValue={bookData.cover_photo}
              />
            </fieldset>

            <fieldset className="bg-pink-100 border border-pink-300 rounded-xl p-4 shadow-md">
              <label className="label font-semibold">Total Pages</label>
              <input
                type="number"
                className="input input-bordered w-full"
                name="total_page"
                defaultValue={bookData.total_page}
              />
            </fieldset>

            <fieldset className="bg-blue-100 border border-blue-300 rounded-xl p-4 shadow-md">
              <label className="label font-semibold">Book Author</label>
              <input
                type="text"
                className="input input-bordered w-full"
                name="book_author"
                defaultValue={bookData.book_author}
              />
            </fieldset>

            <fieldset className="bg-indigo-100 border border-indigo-300 rounded-xl p-4 shadow-md">
              <label className="label font-semibold">Book Category</label>
              <select
                name="book_category"
                className="select select-bordered w-full"
                defaultValue={bookData.book_category}
              >
                <option>Fiction</option>
                <option>Non-Fiction</option>
                <option>Fantasy</option>
                <option>Motivational</option>
              </select>
            </fieldset>

            <fieldset className="bg-red-100 border border-red-300 rounded-xl p-4 shadow-md">
              <label className="label font-semibold">Reading Status</label>
              <select
                name="reading_status"
                className="select select-bordered w-full"
                defaultValue={bookData.reading_status}
              >
                <option>Read</option>
                <option>Reading</option>
                <option>Want-to-Read</option>
              </select>
            </fieldset>
          </div>

          <fieldset className="mt-6 bg-purple-100 border border-purple-300 rounded-xl p-4 shadow-md">
            <label className="label font-semibold">Book Overview</label>
            <textarea
              name="book_overview"
              rows="4"
              className="textarea textarea-bordered w-full"
              defaultValue={bookData.book_overview}
            ></textarea>
          </fieldset>

          <fieldset className="mt-6 bg-gray-200 border border-gray-400 rounded-xl p-4 shadow-md">
            <label className="label font-semibold">Upvote</label>
            <input
              type="number"
              className="input input-bordered w-full"
              defaultValue={bookData.upvote || 0}
              name="upvote"
              readOnly
            />
          </fieldset>

          <input
            type="submit"
            className="btn btn-primary w-full mt-6 text-lg tracking-wide hover:scale-[1.02] transition-transform duration-300"
            value="Update Book"
          />
        </form>
      </div>
    </Zoom>
  );
};

export default UpdateBook;
