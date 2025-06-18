import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Fade } from "react-awesome-reveal";

const COLORS = ["#FF6B6B", "#4ECDC4", "#FFD93D", "#A29BFE"];
const CATEGORIES = ["Fiction", "Non-Fiction", "Fantasy", "Motivational"];

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);

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

  const categoryCounts = CATEGORIES.map((cat) => ({
    name: cat,
    value: books.filter((book) => book.book_category === cat).length,
  }));

  return (
    <div className="p-4 sm:p-8 md:p-12 max-w-6xl mx-auto">
      <Fade cascade>
        <div className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-purple-300 via-pink-200 to-yellow-200 rounded-2xl p-6 shadow-lg transition duration-300 hover:scale-[1.02]">
          <img
            src={user?.photoURL}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md hover:scale-105 transition-transform duration-300"
          />
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-purple-700 drop-shadow-md">
              {user?.displayName || "Anonymous Reader"}
            </h2>
            <p className="text-lg text-gray-700">{user?.email}</p>
            <p className="text-[16px] font-semibold text-gray-500 mt-2">
              Total Books Added:{" "}
              <span className="font-bold">{books.length}</span>
            </p>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-800 drop-shadow">
            Books by Category
          </h3>
          <div className="w-full h-[300px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryCounts}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    percent > 0
                      ? `${name} (${(percent * 100).toFixed(0)}%)`
                      : ""
                  }
                >
                  {categoryCounts.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      className="transition-all duration-300"
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default UserProfile;
