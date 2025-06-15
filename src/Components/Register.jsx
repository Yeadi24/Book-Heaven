import React, { use } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import { toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";

const Register = () => {
  document.title = "Register";
  const navigate = useNavigate();
  const { createUser, update, GoogleSignIn } = use(AuthContext);
  const handleGoogleSignIn = () => {
    GoogleSignIn()
      .then(() => {
        Swal.fire({
          title: "SignIn Successful !!!",
          icon: "success",
          draggable: true,
        });
        navigate("/");
      })
      .catch(() => {});
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photo = e.target.photo.value;

    createUser(email, password)
      .then(() => {
        console.log("created");
        update(name, photo)
          .then(() => {
            Swal.fire({
              title: "Signup Successful !!!",
              icon: "success",
              draggable: true,
            });
            navigate("/");
          })
          .catch(() => {
            Swal.fire({
              title: "Ooopss Signup Unsuccessful !!!",
              icon: "success",
              draggable: true,
            });
          });
      })
      .catch(() => {
        toast("Error creating user");
      });
  };
  return (
    <div className="card bg-base-300 p-8 mt-20 mx-auto m-10 max-w-sm shrink-0 shadow-2xl">
      <h1 className="text-2xl font-bold mx-auto">Register now!</h1>
      <div className="card-body">
        <form onSubmit={handleRegister}>
          <label className="label">Name</label>
          <input type="text" className="input" placeholder="Name" name="name" />
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            name="email"
          />
          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            name="password"
            pattern="^(?=.*[A-Z])(?=.*[a-z]).{6,}$"
            title="Password must be at least 6 characters, with at least one uppercase and one lowercase letter."
          />
          <label className="label">PhotoURL</label>
          <input
            type="text"
            className="input"
            placeholder="PhotoURL"
            name="photo"
          />
          <button className="btn btn-neutral mt-4 ml-20">Register</button>
        </form>
        <button
          onClick={handleGoogleSignIn}
          className="btn google flex justify-around items-center bg-green-300 p-2 rounded-xl my-2 border-2 border-black"
        >
          <FaGoogle size={25} />
          <span className="text-[16px] font-semibold">LogIn with Google</span>
        </button>
        <p>
          Already Have an Account?
          <Link className="text-blue-700" to="/login">
            LogIn
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
