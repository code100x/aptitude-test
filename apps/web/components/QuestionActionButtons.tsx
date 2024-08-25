import React from "react";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import { QuestionStatus, QuizQuestion } from "@repo/common/config";
import { currentQuestionId as recoilCurrentQuestionId, questionsData } from "@repo/store";

const QuestionActionButtons = () => {
  const router = useRouter();

  const [questions, setQuestions] = useRecoilState<QuizQuestion[]>(questionsData);
  const [currentQuestionId, setCurrentQuestionId] = useRecoilState(recoilCurrentQuestionId);

  const updateQuestionStatus = (questionId: number, newStatus: QuestionStatus | string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === questionId ? { ...q, status: newStatus } : q)),
    );
  };

  const handleSaveAndNextClick = () => {
    const currentQuestion = questions.find((q) => q.id === currentQuestionId);
    if (currentQuestion?.selectedOptionId) {
      currentQuestionId && updateQuestionStatus(currentQuestionId, QuestionStatus.Answered);
      const currentIndex = questions.findIndex((q) => q.id === currentQuestionId);
      const nextIndex = Math.min(currentIndex + 1, questions.length - 1);
      setCurrentQuestionId(questions[nextIndex]!.id);
    } else {
      swal("No Ser!!", "Please select an option to save and go to the next question");
    }
  };

  const handleMarkForReview = () => {
    const currentQuestion = questions.find((q) => q.id === currentQuestionId);
    const status = currentQuestion?.selectedOptionId
      ? QuestionStatus.ReviewWithAnswer
      : QuestionStatus.ReviewWithoutAnswer;
    console.log({ status });

    currentQuestionId && updateQuestionStatus(currentQuestionId, status);

    const currentIndex = questions.findIndex((q) => q.id === currentQuestionId);
    const nextIndex = Math.min(currentIndex + 1, questions.length - 1);
    setCurrentQuestionId(questions[nextIndex]!.id);
  };

  const navigateQuestion = (offset: number) => {
    const currentIndex = questions.findIndex((q) => q.id === currentQuestionId);
    const newIndex = Math.min(Math.max(currentIndex + offset, 0), questions.length - 1);
    setCurrentQuestionId(questions[newIndex]!.id);
  };

  const handleNextClick = () => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === currentQuestionId &&
        q.selectedOptionId &&
        q.status !== QuestionStatus.Answered &&
        q.status !== QuestionStatus.ReviewWithAnswer
          ? { ...q, status: "visited" }
          : q,
      ),
    );
    navigateQuestion(1);
  };

  const handlePrevClick = () => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === currentQuestionId &&
        q.selectedOptionId &&
        q.status !== QuestionStatus.Answered &&
        q.status !== QuestionStatus.ReviewWithAnswer
          ? { ...q, status: "visited" }
          : q,
      ),
    );
    navigateQuestion(-1);
  };

  const handleClearClick = () => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === currentQuestionId ? { ...q, selectedOptionId: null } : q)),
    );
  };

  const handleSubmitClick = () => {
    router.replace("/submit-confirmation");
  };

  return (
    <>
      <div className="mt-6 flex gap-2">
        <button
          className="rounded-lg bg-green-500 px-4 py-2 text-white"
          onClick={handleSaveAndNextClick}
        >
          Save & Next
        </button>
        <button className="rounded-lg bg-slate-800 px-4 py-2" onClick={handlePrevClick}>
          Previous
        </button>
        <button className="rounded-lg bg-slate-800 px-4 py-2" onClick={handleClearClick}>
          Clear
        </button>
        <button className="rounded-lg bg-slate-800 px-4 py-2" onClick={handleNextClick}>
          Next
        </button>
        <button
          className="rounded-lg bg-purple-500 px-4 py-2 text-white"
          onClick={handleMarkForReview}
        >
          Mark for Review
        </button>
      </div>
      <div className="mt-4">
        <button
          className="rounded-lg bg-green-500 px-8 py-2 text-white"
          onClick={handleSubmitClick}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default QuestionActionButtons;
