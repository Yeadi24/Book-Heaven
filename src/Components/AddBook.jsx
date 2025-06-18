import React, { use } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Contexts/AuthContext";
import { Zoom } from "react-awesome-reveal";
import axios from "axios";

const AddBook = () => {
  document.title = "Add Book | Book Heaven";
  const { user } = use(AuthContext);
  const email = user.email;
  const name = user.displayName;
  const navigate = useNavigate();

  const handleAddBook = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const bookData = Object.fromEntries(formData.entries());
    bookData.avatar = user.photoURL;
    bookData.upvote = 0;

    axios
      .post(
        "https://server-side-yeadi24-yeadi-24s-projects.vercel.app/books",
        { withCredentials: true },
        bookData
      )
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire("Book has been added to the shelf 📚");
          form.reset();
          navigate("/mybooks");
        }
      })
      .catch((err) => {
        console.error("Error adding book:", err);
      });
  };

  return (
    <Zoom triggerOnce>
      <div className="px-4 sm:px-8 md:px-16 lg:px-32 py-16">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-purple-700 mb-4 drop-shadow-lg">
            Add A New Book
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your favorite reads with the world. Fill in the details and
            place your book on the digital shelf!
          </p>
        </div>

        <form onSubmit={handleAddBook}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <fieldset className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 border border-purple-300 rounded-xl p-4 shadow-md transition-all duration-300 hover:scale-[1.01]">
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

            <fieldset className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 border border-purple-300 rounded-xl p-4 shadow-md transition-all duration-300 hover:scale-[1.01]">
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

            <fieldset className="bg-yellow-100 border border-yellow-300 rounded-xl p-4 shadow-md hover:scale-[1.01] transition-all">
              <label className="label font-semibold">Book Title</label>
              <input
                type="text"
                className="input input-bordered w-full"
                name="book_title"
                placeholder="Enter Book Title"
              />
            </fieldset>

            <fieldset className="bg-green-100 border border-green-300 rounded-xl p-4 shadow-md hover:scale-[1.01] transition-all">
              <label className="label font-semibold">Cover Photo URL</label>
              <input
                type="text"
                className="input input-bordered w-full"
                name="cover_photo"
                placeholder="Enter Cover Photo URL"
              />
            </fieldset>

            <fieldset className="bg-pink-100 border border-pink-300 rounded-xl p-4 shadow-md hover:scale-[1.01] transition-all">
              <label className="label font-semibold">Total Pages</label>
              <input
                type="number"
                className="input input-bordered w-full"
                name="total_page"
                placeholder="e.g. 300"
              />
            </fieldset>

            <fieldset className="bg-blue-100 border border-blue-300 rounded-xl p-4 shadow-md hover:scale-[1.01] transition-all">
              <label className="label font-semibold">Book Author</label>
              <input
                type="text"
                className="input input-bordered w-full"
                name="book_author"
                placeholder="Author Name"
              />
            </fieldset>

            <fieldset className="bg-indigo-100 border border-indigo-300 rounded-xl p-4 shadow-md hover:scale-[1.01] transition-all">
              <label className="label font-semibold">Book Category</label>
              <select
                name="book_category"
                className="select select-bordered w-full"
              >
                <option>Fiction</option>
                <option>Non-Fiction</option>
                <option>Fantasy</option>
                <option>Motivational</option>
              </select>
            </fieldset>

            <fieldset className="bg-red-100 border border-red-300 rounded-xl p-4 shadow-md hover:scale-[1.01] transition-all">
              <label className="label font-semibold">Reading Status</label>
              <select
                name="reading_status"
                className="select select-bordered w-full"
              >
                <option>Read</option>
                <option>Reading</option>
                <option>Want-to-Read</option>
              </select>
            </fieldset>
          </div>

          <fieldset className="mt-6 bg-purple-100 border border-purple-300 rounded-xl p-4 shadow-md hover:scale-[1.01] transition-all">
            <label className="label font-semibold">Book Overview</label>
            <textarea
              name="book_overview"
              rows="4"
              className="textarea textarea-bordered w-full"
              placeholder="Give a brief description or review of the book"
            ></textarea>
          </fieldset>

          <fieldset className="mt-6 bg-gray-200 border border-gray-400 rounded-xl p-4 shadow-md">
            <label className="label font-semibold">Upvote</label>
            <input
              type="number"
              className="input input-bordered w-full"
              defaultValue={0}
              name="upvote"
              readOnly
            />
          </fieldset>

          <input
            type="submit"
            className="btn btn-accent w-full mt-6 text-lg tracking-wide transition-transform duration-300 hover:scale-[1.02]"
            value="Add Book"
          />
        </form>
      </div>
    </Zoom>
  );
};

export default AddBook;
