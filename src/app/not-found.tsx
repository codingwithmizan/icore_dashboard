"use client";

import Link from "next/link";
import { motion } from "motion/react";

// import Lottie from "lottie-react";

const Notfound = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 overflow-hidden px-4">
      <div className="absolute inset-0 bg-[radial-gradient(#ccefcf_1px,transparent_1px)] [background-size:20px_20px] z-0 opacity-40" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="z-10 w-full max-w-md"
      >
        {/* <Lottie animationData={"lottie/404.json"} loop autoplay /> */}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-center mt-6 z-10"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The page you&#39;re looking for doesn’t exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-block bg-green-600 hover:bg-green-700 transition-colors duration-200 text-white font-medium px-6 py-3 rounded-full shadow-md"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default Notfound;
