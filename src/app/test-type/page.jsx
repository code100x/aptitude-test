"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { CheckCircle, Clock, FileText, Lightbulb } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TestStartPage = () => {
  const [testTitle, setTestTitle] = useState("");
  const [testLevel, setTestLevel] = useState("");
  const [questionCount, setQuestionCount] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const handleStartTest = async () => {
    if (!testTitle || !testLevel || !questionCount) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const mockQuestions = Array(parseInt(questionCount))
        .fill(null)
        .map((_, index) => ({
          id: index + 1,
          question: `Sample question ${
            index + 1
          } for ${testTitle} (${testLevel} level)`,
          options: ["Option A", "Option B", "Option C", "Option D"],
        }));

      setQuestions(mockQuestions);
      setTestStarted(true);
      toast.success("Test questions generated successfully!");
    } catch (error) {
      console.error("Error generating questions:", error);
      toast.error("Failed to generate questions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (testStarted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-[#484848]">{testTitle}</h1>
        <p className="mb-4 text-[#767676]">Level: {testLevel}</p>
        <p className="mb-6 text-[#767676]">
          Number of questions: {questionCount}
        </p>
        {questions.map((q) => (
          <motion.div
            key={q.id}
            className="mb-6 p-4 border rounded shadow bg-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-semibold mb-2 text-[#484848]">{q.question}</p>
            {q.options.map((option, index) => (
              <div key={index} className="ml-4 my-2">
                <input
                  type="radio"
                  id={`q${q.id}o${index}`}
                  name={`question${q.id}`}
                  className="mr-2"
                />
                <label htmlFor={`q${q.id}o${index}`} className="text-[#767676]">
                  {option}
                </label>
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-6 py-12">
        <motion.div
          className="text-center mb-12"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h1 className="text-5xl font-bold text-[#484848] mb-6">
            Start a New Test
          </h1>
          <p className="text-xl text-[#767676]">
            Customize your test experience and challenge yourself!
          </p>
        </motion.div>

        <motion.div
          className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="space-y-6">
            <div>
              <Label htmlFor="testTitle" className="text-[#484848] mb-2 block">
                Test Title
              </Label>
              <Input
                id="testTitle"
                value={testTitle}
                onChange={(e) => setTestTitle(e.target.value)}
                placeholder="Enter test title"
                className="w-full border-gray-300 rounded-md"
              />
            </div>
            <div>
              <Label htmlFor="testLevel" className="text-[#484848] mb-2 block">
                Test Level
              </Label>
              <Select onValueChange={setTestLevel}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label
                htmlFor="questionCount"
                className="text-[#484848] mb-2 block"
              >
                Number of Questions
              </Label>
              <Input
                id="questionCount"
                type="number"
                value={questionCount}
                onChange={(e) => setQuestionCount(e.target.value)}
                placeholder="Enter number of questions"
                min="1"
                className="w-full border-gray-300 rounded-md"
              />
            </div>
            <Button
              onClick={handleStartTest}
              disabled={isLoading}
              className="w-full bg-[#FF5A5F] hover:bg-[#FF385C] text-white text-lg rounded-full py-4 transition-all duration-300 ease-in-out transform hover:shadow-lg"
            >
              {isLoading ? "Generating Questions..." : "Start Test"}
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="mt-16 bg-white rounded-lg shadow-md p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="text-3xl font-semibold text-[#484848] mb-8 text-center">
            Why Choose Our Aptitude Test?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <CheckCircle className="w-6 h-6 text-[#FF5A5F]" />,
                text: "Comprehensive assessment of your skills",
              },
              {
                icon: <FileText className="w-6 h-6 text-[#FF5A5F]" />,
                text: "Personalized report with detailed insights",
              },
              {
                icon: <Clock className="w-6 h-6 text-[#FF5A5F]" />,
                text: "Flexible test duration at your convenience",
              },
              {
                icon: <Lightbulb className="w-6 h-6 text-[#FF5A5F]" />,
                text: "Helps in making informed career decisions",
              },
            ].map((feature, index) => (
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
    </div>
  );
};

export default TestStartPage;
