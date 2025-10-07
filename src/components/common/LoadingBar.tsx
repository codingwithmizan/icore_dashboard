"use client";

import { motion } from "motion/react";

export const LoadingBar = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-6 -mt-20">
        {/* Smooth Circular Spinner */}
        <motion.div
          className="w-20 h-20 rounded-full border-[3px] border-emerald-700 border-t-transparent shadow-md"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.1,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        {/* Elegant Dot Trail */}
        <div className="flex space-x-3">
          {[0, 0.15, 0.3].map((delay, index) => (
            <motion.div
              key={index}
              className="w-2.5 h-2.5 rounded-full bg-emerald-700 shadow-sm"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.2,
                delay,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
