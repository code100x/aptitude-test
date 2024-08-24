import { QuizQuestion } from "@repo/common/config";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentQuestionId as recoilCurrentQuestionId, questionsData } from "@repo/store";

const Question = () => {
  const [questions, setQuestions] = useRecoilState<QuizQuestion[]>(questionsData);
  const currentQuestionId = useRecoilValue(recoilCurrentQuestionId);

  const currentQuestion = questions.find((q) => q.id === currentQuestionId);

  const handleOptionSelect = (questionId: number, optionId: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === questionId ? { ...q, selectedOptionId: optionId } : q)),
    );
  };
  return (
    <>
      <p className="mb-4 mt-10 text-4xl font-semibold">
        {`${questions.findIndex((q) => q.id === currentQuestionId) + 1}. ${currentQuestion?.question}`}
      </p>
      <div className="ml-6 flex flex-col space-y-4">
        {currentQuestion?.options.map((option) => (
          <label key={option.id} className="flex cursor-pointer items-center space-x-2 self-start">
            <input
              checked={currentQuestion.selectedOptionId === option.id}
              className="form-radio text-blue-500"
              name={`question-${currentQuestion.id}`}
              onChange={() => handleOptionSelect(currentQuestion.id, option.id)}
              type="radio"
              value={option.id}
            />
            <span className="text-xl">{option.text}</span>
          </label>
        ))}
      </div>
    </>
  );
};

export default Question;
