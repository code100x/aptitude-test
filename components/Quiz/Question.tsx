import { useState } from "react";
import { Button } from "../ui/button";
import { QuestionWithOptions } from "./MainSection";
import Option from "./Option";
import { toast } from "sonner";
import axios from "axios";

const Question = ({
  data,
  qNo,
  testId,
  userId,
}: {
  data: QuestionWithOptions;
  qNo: number;
  testId: string;
  userId: string;
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSelectOption = async (option: string) => {
    try {
      const res = await axios.post("/api/quiz/response", {
        userId,
        testAttemptId: testId,
        questionId: data.id,
        selectedOptionId: option,
      });
      console.log("res", res);
      setSelectedOption(option);
      toast("Response saved", {
        style: { background: "#b9fbc0" },
      });
    } catch (error) {
      console.log("error", error);
      toast("Error in saving response", {
        style: { background: "#f72585" },
      });
    }
  };

  return (
    <div className="flex flex-col flex-grow mb-10">
      <div className="px-4 py-2 text-xl font-bold bg-[#0081a7] rounded-t-xl text-white">
        Question {qNo}
      </div>
      <div className="p-4 font-medium bg-[#f8edeb] rounded-b-xl">
        <div className="font-semibold text-2xl h-[10vh]">{data.question}</div>
        <div className="grid grid-cols-2 gap-10 mt-10">
          {data.options.map((option) => (
            <Option
              key={option.optionId}
              option={option}
              selectedOption={selectedOption}
              handleSelectOption={handleSelectOption}
            />
          ))}
        </div>
      </div>
      {/* <div className="flex justify-around mt-6">
        <Button variant="navigation">Back</Button>
        <Button variant="navigation">Next</Button>
      </div> */}
    </div>
  );
};

export default Question;
