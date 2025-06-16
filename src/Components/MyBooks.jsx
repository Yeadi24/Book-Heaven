import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { use } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Contexts/AuthContext";
import { Bounce } from "react-awesome-reveal";

const MyBooks = () => {
  document.title = "My Posts";
  const { user } = use(AuthContext);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      fetch(`https://coffe-server-bay.vercel.app/myposts?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setPosts(data);
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
        fetch(`https://coffe-server-bay.vercel.app/posts/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setPosts(posts.filter((post) => post._id !== id));
              Swal.fire("Deleted!", "Your post has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <Bounce triggerOnce>
      <div className="p-10">
        <h1 className="text-4xl font-bold text-center mb-10">My Posts</h1>

        {posts.length === 0 ? (
          <div className="flex items-center justify-center h-60">
            <h2 className="text-5xl font-extrabold text-red-500 animate-pulse">
              No Post Found !!!
            </h2>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto mb-12">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Rent</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post, index) => (
                    <tr key={post._id}>
                      <th>{index + 1}</th>
                      <td>
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={post.avatar} alt="User Avatar" />
                          </div>
                        </div>
                      </td>
                      <td>{post.name}</td>
                      <td>${post.rent}</td>
                      <td>{post.location}</td>
                      <td>{post.type}</td>
                      <td>
                        <button
                          onClick={() => navigate(`/updatePost/${post._id}`)}
                          className="btn btn-xs bg-blue-500 text-white hover:bg-blue-600"
                        >
                          Update
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="btn btn-xs bg-red-500 text-white hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-transform transform hover:scale-105 duration-300"
                >
                  <img
                    src={post.url}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-bold mb-2 text-gray-800">
                          {post.title}
                        </h2>
                        <p className="text-gray-600">
                          <strong>Location:</strong> {post.location}
                        </p>
                        <p className="text-gray-600">
                          <strong>Rent:</strong> ${post.rent}
                        </p>
                        <p className="text-gray-600">
                          <strong>Room Type:</strong> {post.type}
                        </p>
                        <p className="text-gray-600">
                          <strong>Availability:</strong> {post.availability}
                        </p>
                        <p className="text-gray-600 mt-2">
                          <strong>Contact:</strong> {post.contact}
                        </p>
                      </div>

                      {/* User Avatar and Name */}
                      <div className="flex flex-col items-center ml-4">
                        <div className="avatar avatar-online">
                          <div className="w-24 rounded-full">
                            <img src={user?.photoURL} alt="User avatar" />
                          </div>
                        </div>
                        <p className="mt-2 text-gray-700 font-bold">
                          {user?.displayName}
                        </p>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-4 flex justify-between">
                      <button
                        onClick={() => navigate(`/updatePost/${post._id}`)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Bounce>
  );
};

export default MyBooks;
