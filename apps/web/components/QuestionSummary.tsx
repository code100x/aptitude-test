import React from "react";
import { QuestionStatus, QuizQuestion } from "@repo/common/config";
import { useRecoilValue } from "recoil";
import { questionsData } from "@repo/store";

import { getQuestionColorAndText } from "../app/utils";

const getCount = (questions: QuizQuestion[], status: QuestionStatus) =>
  questions?.reduce((acc, question) => {
    if (question.status === status) acc += 1;
    return acc;
  }, 0);

const StatusBox = ({ questionStatus }: { questionStatus: QuestionStatus }) => {
  const quizQuestions = useRecoilValue(questionsData);
  const count = getCount(quizQuestions, questionStatus);
  const { color, label } = getQuestionColorAndText(questionStatus);

  return (
    <div className="flex items-center gap-2">
      <div
        className={`mx-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-bold text-white ${color}`}
      >
        {count}
      </div>
      {label}
    </div>
  );
};

const QuestionSummary = () => {
  return (
    <div className="col grid grid-cols-2 gap-y-2 p-4">
      <StatusBox questionStatus={QuestionStatus.Default} />
      <StatusBox questionStatus={QuestionStatus.Visited} />
      <StatusBox questionStatus={QuestionStatus.Answered} />
      <StatusBox questionStatus={QuestionStatus.ReviewWithAnswer} />
      <StatusBox questionStatus={QuestionStatus.ReviewWithoutAnswer} />
    </div>
  );
};

export default QuestionSummary;
