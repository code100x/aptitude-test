"use client";

import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { currentQuestionId as recoilCurrentQuestionId, questionsData } from "@repo/store";
import { QuestionStatus, QuizQuestion } from "@repo/common/config";
import swal from "sweetalert";
import { motion } from "framer-motion";

import QuestionSummary from "./QuestionSummary";
import Timer from "./Timer";

import QuestionsPalette from "./QuestionsPalette";
import Question from "./Question";
import QuestionActionButtons from "./QuestionActionButtons";

const QuizComponent = () => {
  const [questions, setQuestions] = useRecoilState<QuizQuestion[]>(questionsData);
  const [currentQuestionId, setCurrentQuestionId] = useRecoilState(recoilCurrentQuestionId);
  const [previousQuestionId, setPreviousQuestionId] = useState<number | null>(null);

  const handleTimerComplete = () => {
    // navigate to completion page
    swal("Times Up!!", "Thank You for your response", "success");
  };

  useEffect(() => {
    if (previousQuestionId !== null) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) => {
          if (q.id === previousQuestionId) {
            return q.selectedOptionId || q.status === QuestionStatus.ReviewWithoutAnswer
              ? q
              : { ...q, status: "visited" };
          }
          return q;
        }),
      );
    }
    if (currentQuestionId === null) {
      setCurrentQuestionId(questions[0]!.id);
    }

    setPreviousQuestionId(currentQuestionId);
  }, [currentQuestionId]);

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto mt-12 px-4"
      exit={{ opacity: 0, y: -20 }}
      initial={{ opacity: 0, y: 20 }}
    >
      <div className="flex p-4">
        <div className="w-2/3 p-4">
          <Question />
          <QuestionActionButtons />
        </div>
        <div className="w-1/3">
          <Timer onComplete={handleTimerComplete} duration={60 * 60 * 2} />
          <QuestionSummary />
          <QuestionsPalette />
        </div>
      </div>
    </motion.div>
  );
};

export default QuizComponent;
