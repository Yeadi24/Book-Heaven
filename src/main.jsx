import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./layouts/Layout.jsx";
import Home from "./Components/Home.jsx";
import Login from "./Components/Login.jsx";
import Register from "./Components/Register.jsx";
import AuthProvider from "./Contexts/AuthProvider.jsx";
import AddBook from "./Components/AddBook.jsx";
import PrivateRoute from "./Routes/PrivateRoute.jsx";
import BookShelf from "./Components/BookShelf.jsx";
import MyBooks from "./Components/MyBooks.jsx";
import UpdateBook from "./Components/UpdateBook.jsx";
import Profile from "./Components/Profile.jsx";
import BookDetails from "./Components/BookDetails.jsx";
import NotFound from "./Components/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,

        Component: Home,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "/addBook",
        element: (
          <PrivateRoute>
            <AddBook></AddBook>
          </PrivateRoute>
        ),
      },
      {
        path: "/bookshelf",
        loader: () => {
          const data = fetch(`http://localhost:3000/books`);
          return data;
        },
        element: <BookShelf></BookShelf>,
      },
      {
        path: "/mybooks",
        element: (
          <PrivateRoute>
            <MyBooks></MyBooks>
          </PrivateRoute>
        ),
      },
      {
        path: "/updateBook/:id",
        loader: ({ params }) => {
          const data = fetch(`http://localhost:3000/books/${params.id}`);
          return data;
        },
        element: (
          <PrivateRoute>
            <UpdateBook></UpdateBook>
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",

        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "/books/:id",
        loader: ({ params }) => {
          const data = fetch(`http://localhost:3000/posts/${params.id}`);
          return data;
        },
        element: (
          <PrivateRoute>
            <BookDetails></BookDetails>
          </PrivateRoute>
        ),
        errorElement: <NotFound></NotFound>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
