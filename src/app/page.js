"use client";
import React from "react";
import { motion } from "framer-motion";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, FileText, Lightbulb } from "lucide-react";

export default function Home() {
  const { user, isLoading } = useUser();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const features = [
    {
      icon: <CheckCircle className="w-6 h-6 text-[#FF5A5F]" />,
      text: "Comprehensive assessment of your skills and abilities",
    },
    {
      icon: <FileText className="w-6 h-6 text-[#FF5A5F]" />,
      text: "Personalized report with detailed insights",
    },
    {
      icon: <Clock className="w-6 h-6 text-[#FF5A5F]" />,
      text: "Flexible 2-hour test duration at your convenience",
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-[#FF5A5F]" />,
      text: "Helps in making informed career decisions",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.h1
            className="text-3xl font-bold text-[#FF5A5F]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            100xDevs
          </motion.h1>
          <div>
            {isLoading ? (
              <p>Loading...</p>
            ) : user ? (
              <Button
                className="bg-[#FF5A5F] hover:bg-[#FF385C] text-white rounded-full px-6 py-2 transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={() => (window.location.href = "/api/auth/logout")}
              >
                Logout
              </Button>
            ) : (
              <Button
                className="bg-[#FF5A5F] hover:bg-[#FF385C] text-white rounded-full px-6 py-2 transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={() => (window.location.href = "/api/auth/login")}
              >
                Login
              </Button>
            )}
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-12">
        <motion.div
          className="text-center"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h2 className="text-5xl font-bold text-[#484848] mb-6">
            Discover Your Potential
          </h2>
          <p className="text-xl text-[#767676] mb-8">
            Take our comprehensive 2-hour aptitude test and unlock your true
            capabilities!
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className="bg-[#FF5A5F] hover:bg-[#FF385C] text-white text-lg rounded-full px-12 py-4 transition-all duration-300 ease-in-out transform hover:shadow-lg"
              onClick={() => alert("Test functionality to be implemented")}
            >
              Take Test
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-16 bg-white rounded-lg shadow-md p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h3 className="text-3xl font-semibold text-[#484848] mb-8 text-center">
            Why Choose Our Aptitude Test?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <div className="flex-shrink-0">{feature.icon}</div>
                <p className="text-[#484848] text-lg">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      <footer className="bg-[#F7F7F7] text-[#767676] py-6">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 100xDevs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
