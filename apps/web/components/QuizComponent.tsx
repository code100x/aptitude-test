"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { currentQuestionId as recoilCurrentQuestionId, questionsData } from "@repo/store";
import { QuestionStatus, QuizQuestion } from "@repo/common/config";
import { motion } from "framer-motion";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import QuestionSummary from "./QuestionSummary";
import Timer from "./Timer";
import QuestionsPalette from "./QuestionsPalette";
import Question from "./Question";
import QuestionActionButtons from "./QuestionActionButtons";

const QuizComponent = () => {
  const router = useRouter();

  const [questions, setQuestions] = useRecoilState<QuizQuestion[]>(questionsData);
  const [currentQuestionId, setCurrentQuestionId] = useRecoilState(recoilCurrentQuestionId);
  const [previousQuestionId, setPreviousQuestionId] = useState<number | null>(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const handleTimerComplete = () => {
    setIsAlertVisible(true);
  };

  const handleSubmitClick = () => {
    setIsAlertVisible(false);
    router.push("/");
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
        <div className="w-[60vw] p-4">
          <Question />
          <QuestionActionButtons />
        </div>
        <div className="w-[30vw]">
          <Timer onComplete={handleTimerComplete} duration={60 * 60 * 2} />
          <QuestionSummary />
          <QuestionsPalette />
        </div>
      </div>
      <AlertDialog open={isAlertVisible}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Times Up!!</AlertDialogTitle>
            <AlertDialogDescription>
              Thank You for your response participating
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleSubmitClick}>Submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default QuizComponent;
