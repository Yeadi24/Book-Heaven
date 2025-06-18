import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "motion/react";

const Banner = () => {
  return (
    <div className="mx-6 md:mx-10 lg:mx-20 mt-10 rounded-3xl p-10 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-3xl font-extrabold text-purple-700 mb-4">
              Welcome to{" "}
              <span className="text-indigo-600">
                <Typewriter
                  words={[
                    "Book Heaven",
                    "Your Reading Space",
                    "Add. Track. Discover.",
                  ]}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </span>
            </h1>
            <p className="text-lg md:text-[16px] text-gray-700 mb-6 leading-relaxed">
              Build your personal library by adding books you want to read,
              track your reading progress with ease, and organize your
              collection effortlessly—all while discovering, saving, and
              revisiting your favorite titles anytime.
            </p>
            <button className="btn btn-secondary text-white px-6 py-2 rounded-full hover:bg-purple-600 transition duration-300">
              Explore
            </button>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center gap-4 flex-wrap">
            <motion.div
              animate={{ y: [0, 30, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="w-40 md:w-48 lg:w-56 rounded-xl shadow-lg overflow-hidden"
            >
              <img
                src="https://i.ibb.co/dsDJGfg1/banner4.jpg"
                alt="Book Image 1"
                className="w-full h-auto object-cover"
              />
            </motion.div>

            <motion.div
              className="w-40 md:w-48 lg:w-56 rounded-xl shadow-lg overflow-hidden"
              animate={{ y: [0, -30, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <img
                src="https://i.ibb.co/rKq0T8TJ/banner5.jpg"
                alt="Book Image 2"
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
