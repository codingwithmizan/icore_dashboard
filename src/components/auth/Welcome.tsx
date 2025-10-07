"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const icore_dashboard = "/images/icore_dashboard.png";

export const Welcome = () => {
  const [isClient, setIsClient] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const fullText = "Empowering your workflow";

  useEffect(() => {
    setIsClient(true);
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  const floatingElements = [
    {
      width: 300,
      height: 300,
      left: -15,
      top: 15,
      path: [
        { x: 0, y: 0, rotate: 0 },
        { x: 25, y: -10, rotate: 90 },
        { x: -15, y: 20, rotate: 180 },
        { x: 5, y: -5, rotate: 270 },
        { x: 0, y: 0, rotate: 360 },
      ],
    },
    {
      width: 350,
      height: 350,
      left: 85,
      top: -8,
      path: [
        { x: 0, y: 0, rotate: 0 },
        { x: -20, y: 15, rotate: 120 },
        { x: 10, y: -5, rotate: 240 },
        { x: -5, y: 10, rotate: 360 },
        { x: 0, y: 0, rotate: 480 },
      ],
    },
    {
      width: 300,
      height: 300,
      left: 65,
      top: 75,
      path: [
        { x: 0, y: 0, rotate: 0 },
        { x: -10, y: -15, rotate: 45 },
        { x: 20, y: 5, rotate: 90 },
        { x: -5, y: 10, rotate: 135 },
        { x: 0, y: 0, rotate: 180 },
      ],
    },
    {
      width: 200,
      height: 200,
      left: 15,
      top: 35,
      path: [
        { x: 0, y: 0, rotate: 0 },
        { x: 5, y: 10, rotate: 60 },
        { x: -10, y: 3, rotate: 120 },
        { x: 3, y: -5, rotate: 180 },
        { x: 0, y: 0, rotate: 240 },
      ],
    },
    {
      width: 180,
      height: 180,
      left: 75,
      top: 55,
      path: [
        { x: 0, y: 0, rotate: 0 },
        { x: -15, y: 5, rotate: 30 },
        { x: 10, y: -3, rotate: 60 },
        { x: -3, y: 10, rotate: 90 },
        { x: 0, y: 0, rotate: 120 },
      ],
    },
    {
      width: 240,
      height: 240,
      left: -10,
      top: 80,
      path: [
        { x: 0, y: 0, rotate: 0 },
        { x: 10, y: -15, rotate: 60 },
        { x: -15, y: 10, rotate: 120 },
        { x: 5, y: -5, rotate: 180 },
        { x: 0, y: 0, rotate: 240 },
      ],
    },
  ];

  return (
    <div className="relative h-full overflow-hidden flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-br from-green-800 via-emerald-900 to-teal-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/10 via-transparent to-transparent opacity-20" />

      {isClient &&
        floatingElements.map((element, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5 border border-white/10 backdrop-blur-sm pointer-events-none"
            style={{
              width: element.width,
              height: element.height,
              left: `${element.left}%`,
              top: `${element.top}%`,
            }}
            animate={{
              x: element.path.map((p) => p.x),
              y: element.path.map((p) => p.y),
              rotate: element.path.map((p) => p.rotate),
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
          />
        ))}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center max-w-2xl mx-auto w-full"
      >
        <div className="mb-8">
          <Image
            src={
              "https://ifarmer-public-files.s3.ap-southeast-1.amazonaws.com/logos/icore_logo_dark.svg"
            }
            alt="icore logo"
            width={200}
            height={200}
            className="mx-auto w-[220px] h-auto hover:scale-105 transition-transform duration-300"
            unoptimized
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white min-h-[4rem]">
          {displayText.split(" ").map((word, i) => (
            <span key={i} className="mr-2">
              {word === "workflow" ? (
                <span className="text-emerald-300 drop-shadow-lg">{word}</span>
              ) : (
                word
              )}
            </span>
          ))}
          {displayText.length === fullText.length && (
            <span className="inline-block w-1 h-8 bg-emerald-300 ml-1 animate-pulse" />
          )}
        </h1>

        <p className="text-xl text-emerald-200 mb-8 leading-relaxed">
          Modern solutions for smarter operations.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full max-w-md mx-auto aspect-video rounded-xl overflow-hidden  hover:shadow-emerald-500/30 transition-all duration-300 "
        >
          <Image
            src={icore_dashboard}
            alt="Dashboard Preview"
            fill
            className="object-cover object-top hover:scale-105 transition-transform duration-500"
            priority
            quality={85}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};