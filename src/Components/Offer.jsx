import React from "react";
import { Roll, Slide } from "react-awesome-reveal";
import { motion } from "framer-motion"; // fixed incorrect import from 'motion/react'

const Offer = () => {
  return (
    <Slide triggerOnce={true} duration={1200} delay={300} direction="left">
      <div className="m-4 md:m-10">
        <div className="hero bg-gradient-to-br from-purple-200 via-pink-100 to-blue-100 min-h-screen rounded-3xl p-5 md:p-10 shadow-xl">
          <div className="hero-content flex-col-reverse lg:flex-row justify-between items-center gap-8 w-full">
            {/* Left Text Section */}
            <div className="text-center lg:text-left max-w-lg">
              <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">
                eBook Launch Offer 🎉
              </h1>
              <p className="py-4 text-lg md:text-xl text-gray-700">
                Unlock your reading journey with 25% off your first eBook
                purchase! Dive into thousands of stories and sharpen your mind
                with premium content.
              </p>
              <button className="btn btn-primary btn-wide mt-2">
                Claim Offer Now
              </button>
            </div>

            {/* Right Animated Phones */}
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full lg:w-auto">
              <motion.div
                className="mockup-phone border-primary w-[220px] sm:w-[250px] md:w-[300px] md:h-[700px]  lg:w-[400px] lg:h-[800px] max-w-full"
                animate={{ y: [20, 0, 20] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <div className="mockup-phone-camera"></div>
                <div className="mockup-phone-display">
                  <img
                    alt="wallpaper"
                    src="https://i.ibb.co/XxMPqFyH/As-Long-as-the-Lemon-Tress-Grow.jpg"
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>
              <motion.div
                className="mockup-phone border-secondary w-[220px] sm:w-[250px] md:w-[300px] md:h-[700px] lg:w-[400px] lg:h-[800px] max-w-full"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <div className="mockup-phone-camera"></div>
                <div className="mockup-phone-display">
                  <img
                    alt="wallpaper"
                    src="https://i.ibb.co/rfc83Nbg/download-1.jpg"
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default Offer;
