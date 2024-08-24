import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentQuestionId as recoilCurrentQuestionId, questionsData } from "@repo/store";
import { getQuestionColorAndText } from "../app/utils";

const QuestionsPalette = () => {
  const questions = useRecoilValue(questionsData);
  const [currentQuestionId, setCurrentQuestionId] = useRecoilState(recoilCurrentQuestionId);
  const handleQuestionClick = (id: number) => {
    setCurrentQuestionId(id);
  };

  return (
    <div className="col s mb-6 grid grid-cols-6 gap-y-4 overflow-auto rounded-sm p-4 shadow-md shadow-[#00000066]">
      {questions.map((question, index) => (
        <div
          key={question.id}
          className={`mx-1 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg font-bold text-white ${getQuestionColorAndText(question.status).color} ${question.id === currentQuestionId ? "scale-110 border-[2px] border-[#0000003f]" : ""} hover:opacity-90`}
          onClick={() => handleQuestionClick(question.id)}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default QuestionsPalette;
