"use client";

import { useEffect, useState } from "react";
import Question from "./Question";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "../ui/button";

export type Option = {
  optionId: string;
  text: string;
};

export type QuestionWithOptions = {
  id: string;
  question: string;
  image?: string;
  video?: string;
  points: number;
  timeLimit?: number;
  options: Option[];
};

const MainSection = ({setResult}: {setResult: (val:any) => void;}) => {
  const [questions, setQuestions] = useState<QuestionWithOptions[]>([]);
  const [testId, setTestId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  console.log("questions", questions);

  const getQuestions = async () => {
    try {
      const res = await axios.get("/api/questions");
      setQuestions(res.data.questions);
      setTestId(res.data.newTestAttempt.testId);
      setUserId(res.data.newTestAttempt.userId)
      sessionStorage.setItem("testId", res.data.newTestAttempt.testId);
      sessionStorage.setItem("userId", res.data.newTestAttempt.userId);
    } catch (error) {
      console.log("error", error);
      toast("Error in fetching questions", {
        style: { background: "#f72585" },
      });
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const submitQuiz = async () => {
    try {
        const res = await axios.post("/api/quiz", {
          testAttemptId: testId,
        });
        console.log("res", res);
        setResult(res.data);
        toast("Quiz submitted", {
          style: { background: "#b9fbc0" },
        });
      } catch (error) {
        console.log("error", error);
        toast("Error in submitting quiz", {
          style: { background: "#f72585" },
        });
      }
  }

  if (!questions.length) {
    return <h1 className="text-2xl font-bold">Loading...</h1>;
  }

  return (
    <div className="flex flex-col">
    <div className="flex flex-col mr-10 max-h-[70vh] overflow-y-scroll bg-[#e4c1f9] p-6 rounded-2xl">
      {questions.map((question, idx) => (
        <Question key={question.id} data={question} qNo={idx + 1} testId={testId} userId={userId}/>
      ))}
    </div>
    <div className="flex mt-8 items-center justify-center">
        <Button variant={"navigation"} onClick={() => submitQuiz()}>Submit</Button>
    </div>
    </div>
  );
};

export default MainSection;
