"use client";

import Quiz from "@/components/Quiz";
import QuizInstructions from "@/components/Quiz/QuizInstructions";
import Unauthenticated from "@/components/Unauthenticated";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function QuizComponent () {
  const { data: session, status } = useSession();
  const [startQuiz, setStartQuiz] = useState<boolean>(false);

  if (status === "unauthenticated") {
    return <Unauthenticated />;
  }
  return (
    <div className="min-w-full flex-grow flex flex-col justify-center items-center">
      {startQuiz ? <Quiz /> : <QuizInstructions setStartQuiz={setStartQuiz} />}
    </div>
  );
}
