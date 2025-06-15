import React, { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";

const slides = [
  {
    id: 1,
    title: "Create Your Dream Bookshelf",
    subtitle: "Add the books you want to read and organize them your way.",
    image: "https://i.ibb.co/WvvfVSxk/banner1.jpg",
  },
  {
    id: 2,
    title: "Track Your Reading Journey",
    subtitle: "Mark books as ‘Want to Read’, ‘Reading’, or ‘Finished’.",
    image: "https://i.ibb.co/B5yCr9r1/banner2.jpg",
  },
  {
    id: 3,
    title: "Discover & Save Your Next Favorite",
    subtitle: "Explore trending titles and build your personal reading list.",
    image: "https://i.ibb.co/cXCgRk3P/banner3.jpg",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(
    new Array(slides.length).fill(false)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleImageLoad = (index) => {
    setImageLoaded((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  const handleImageError = (index, url) => {
    console.error(`Image ${index + 1} failed to load:`, url);
  };

  return (
    <Fade cascade damping={0.4} delay={800} duration={1200} triggerOnce>
      <div className="w-full max-w-7xl mx-auto h-[400px] md:h-[500px] relative my-10 md:my-24 rounded-3xl overflow-hidden shadow-2xl px-4 sm:px-6 lg:px-8">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="w-full h-full flex-shrink-0 relative"
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  opacity: imageLoaded[index] ? 1 : 0,
                }}
              />

              <img
                src={slide.image}
                alt=""
                className="absolute invisible"
                onLoad={() => handleImageLoad(index)}
                onError={() => handleImageError(index, slide.image)}
              />

              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  imageLoaded[index] ? "opacity-0" : "opacity-100"
                }`}
                style={{
                  background: `linear-gradient(135deg, 
                  ${
                    index === 0
                      ? "#ec4899, #8b5cf6"
                      : index === 1
                      ? "#06b6d4, #10b981"
                      : "#f59e0b, #ef4444"
                  })`,
                }}
              />

              <div className="absolute top-4 left-4 bg-black/50 text-white p-2 rounded text-xs">
                Slide {index + 1}:{" "}
                {imageLoaded[index] ? "Loaded" : "Loading..."}
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 md:px-10 z-10">
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-pink-300 drop-shadow-2xl mb-4">
                  {slide.title}
                </h2>
                <p className="text-base sm:text-lg md:text-2xl text-white font-semibold drop-shadow-lg max-w-3xl">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-pink-500/80 hover:bg-pink-600 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm z-20"
          aria-label="Previous slide"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-pink-500/80 hover:bg-pink-600 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm z-20"
          aria-label="Next slide"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-pink-400 scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </Fade>
  );
};

export default Slider;
