import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";

const logos = [
  "/adobe.jpeg",
  "/apple.jpeg",
  "/ford.jpeg",
  "/good.jpeg",
  "/meta.jpeg",
  "/nvidia.jpeg",
  "/walton.jpeg",
  "/microsoft.jpeg",
];

export default function Brands() {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  // Start the infinite sliding animation
  const startAnimation = () => {
    controls.start({
      x: ["0%", "-100%"],
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 20,
        ease: "linear",
      },
    });
  };

  // Pause animation on hover
  const pauseAnimation = () => {
    controls.stop();
  };

  // Start animation initially
  useEffect(() => {
    if (!isHovered) {
      startAnimation();
    } else {
      pauseAnimation();
    }
  }, [isHovered]);

  return (
    <div className="bg-gray-50 py-12">
      <h2 className="text-4xl font-bold text-center mb-8">Brand Support</h2>
      <div className="overflow-hidden relative">
        <motion.div className="flex space-x-12" animate={controls}>
          {/* Repeat logos twice for smooth looping */}
          {[...logos, ...logos].map((logo, i) => (
            <img
              key={i}
              src={logo}
              alt={`brand-${i}`}
              className={`h-24 w-auto object-contain filter grayscale hover:grayscale-0 cursor-pointer transition duration-300`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
