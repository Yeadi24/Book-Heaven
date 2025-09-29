import React from "react";

const BooksBestsellers = () => {
  const books = [
    {
      id: 1,
      title: "Start with Why",
      author: "Simon Sinek",
      priceRange: "$20.00-$30.00",
      tags: ["Motivational", "Bestseller", "Smart"],
      rating: 5,
      discount: "UP TO - 10%",
      imageUrl: "https://i.ibb.co.com/z1FJCzF/Start-With-Why.jpg",
    },
    {
      id: 2,
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      priceRange: "$25.00-$40.00",
      tags: ["Historic", "Knowledge", "Smart"],
      rating: 5,
      discount: null,
      imageUrl:
        "https://i.ibb.co.com/Jwcyb6Xc/Sapiens-A-Brief-History-of-Humankind.jpg",
    },
    {
      id: 3,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      priceRange: "$18.00-$28.00",
      tags: ["Adventure", "Classic", "Fantasy"],
      rating: 5,
      discount: "UP TO - 15%",
      imageUrl: "https://i.ibb.co.com/vvzHw7Ws/Fantasy-Recommend-Books.jpg",
    },
    {
      id: 4,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      priceRange: "$22.00-$35.00",
      tags: ["Thriller", "Psychological", "Smart"],
      rating: 4,
      discount: null,
      imageUrl: "https://i.ibb.co.com/j9MXvJKx/books-I-recommend.jpg",
    },
  ];

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ));
  };

  return (
    <div className="container mx-10 px-4 py-8 w-full">
      <h2 className="text-3xl text-center font-bold mb-6">Books Bestsellers</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transform transition duration-300 hover:scale-105"
          >
            <div className="relative">
              {/* Book cover image */}
              <div className="w-full h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
                {book.imageUrl ? (
                  <img
                    src={book.imageUrl}
                    alt={`Cover of ${book.title}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-4">
                    <svg
                      className="w-16 h-16 mx-auto text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      ></path>
                    </svg>
                    <p className="mt-2 text-sm text-gray-500">Book Cover</p>
                  </div>
                )}
              </div>

              {/* Discount badge if applicable */}
              {book.discount && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {book.discount}
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
              <p className="text-gray-600 text-sm mb-2">by {book.author}</p>

              <div className="flex items-center mb-3">
                <div className="flex">{renderStars(book.rating)}</div>
                <span className="text-gray-500 text-sm ml-2">
                  ({book.rating}.0)
                </span>
              </div>

              <p className="text-lg font-bold mb-3">{book.priceRange}</p>

              <div className="flex flex-wrap gap-1">
                {book.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`text-xs px-2 py-1 rounded ${
                      tag === "New"
                        ? "bg-green-100 text-green-800"
                        : tag === "Sale" || tag === "Discount"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksBestsellers;
