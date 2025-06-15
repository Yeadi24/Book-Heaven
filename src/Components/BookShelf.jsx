import React from "react";
import { useLoaderData } from "react-router";
import Card from "./Card";
import { Flip } from "react-awesome-reveal";

const BookShelf = () => {
  const books = useLoaderData();
  document.title = "Book Shelf";

  return (
    <Flip direction="horizontal" triggerOnce>
      <div className="py-10 px-4 sm:px-6 lg:px-12 flex flex-col gap-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600">
          Explore Book Shelf 📚
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <Card key={book._id} book={book} />
          ))}
        </div>
      </div>
    </Flip>
  );
};

export default BookShelf;
