import { useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

const QuizInstructions = ({setStartQuiz}: {setStartQuiz: (val: boolean) => void;}) => {
  const [readInstructions, setReacInstructions] = useState<boolean>(false);
  return (
    <div className="w-3/5 flex flex-col rounded-xl mt-28">
      <div className="px-4 py-2 text-xl font-bold bg-slate-800 text-white dark:bg-slate-200 dark:text-black rounded-t-xl">
        Instructions
      </div>
      <div className="p-4 font-medium dark:bg-slate-800 bg-slate-200">
        <ul className="p-4">
          <li className="list-disc">
            You have a total of 2 hours to complete the quiz. Ensure you manage
            your time wisely.
          </li>
          <li className="list-disc">
            The quiz consists of multiple-choice questions (MCQs). Each question
            has only one correct answer.
          </li>
          <li className="list-disc">
            Once an answer is selected, you can review it until you submit the
            quiz. Ensure all answers are final before submission.
          </li>
          <li className="list-disc">
            {" "}
            Do not refresh or close the browser window during the quiz. Doing so
            may result in the loss of progress and could affect your final
            score.
          </li>
          <li className="list-disc">
            {" "}
            Each question carries 10 points. All questions have the same weight,
            so make sure to answer each one carefully.
          </li>
        </ul>
      </div>
      <div className="flex flex-col justify-center items-center py-6 dark:bg-slate-800 bg-slate-200 rounded-b-xl">
        <div className="flex items-center mb-2">
          <Checkbox
            className="mr-2"
            onClick={() => setReacInstructions(!readInstructions)}
          />
          <p className="font-semibold">
            I have read the instructions and ready to proceed.
          </p>
        </div>
        <Button disabled={!readInstructions} onClick={() => setStartQuiz(true)}>
          Proceed
        </Button>
      </div>
    </div>
  );
};

export default QuizInstructions;
