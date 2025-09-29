import React from "react";
import { motion } from "framer-motion";

const GiftPrepaidCards = () => {
  const plans = [
    {
      name: "Yearly Plan",
      price: "$190.99",
      period: "Per/Year",
      description:
        "Save more with our annual plan — the best value for avid readers.",
    },
    {
      name: "6 Month Plan",
      price: "$90.99",
      period: "Per/6 Months",
      description:
        "Perfect for seasonal readers who enjoy flexibility and savings.",
    },
    {
      name: "Monthly Plan",
      price: "$10.99",
      period: "Per/Month",
      description:
        "A great choice to get started — enjoy books month by month.",
    },
  ];

  const floatAnimations = [
    {
      y: [15, -15, 15],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
    {
      y: [0, -15, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
    {
      y: [15, -15, 15],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Gift & Prepaid Cards
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose a plan and surprise your loved ones
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl group"
              animate={floatAnimations[index]}
            >
              <div className="p-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-black mb-2 group-hover:text-blue-600 transition duration-300">
                    {plan.name}
                  </h2>
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-bold text-black group-hover:text-blue-600 transition duration-300">
                      {plan.price}
                    </span>
                    <span className="text-gray-700 ml-1 group-hover:text-blue-600 transition duration-300">
                      {plan.period}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-black text-center  transition duration-300">
                    {plan.description}
                  </p>
                </div>

                <div className="text-center">
                  <button className="bg-white text-black border border-blue-600 hover:bg-blue-600 hover:text-white font-medium py-3 px-6 rounded-lg transition duration-300 w-full">
                    Get this plan
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GiftPrepaidCards;
