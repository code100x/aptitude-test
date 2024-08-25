import { QuestionStatus } from "@repo/common/config";

export const getQuestionColorAndText = (status: QuestionStatus | string) => {
  let color: string;
  let label: string;
  switch (status) {
    case QuestionStatus.Visited:
      color = "bg-red-500";
      label = "Not Answered";
      break;
    case QuestionStatus.Answered:
      color = "bg-green-500";
      label = "Answered";
      break;
    case QuestionStatus.ReviewWithAnswer:
      color = "bg-purple-500";
      label = "Answered and marked for Review";
      break;
    case QuestionStatus.ReviewWithoutAnswer:
      color = "bg-yellow-500";
      label = "Marked for Review";
      break;
    default:
      color = "bg-slate-700";
      label = "Not Visited";
      break;
  }
  return { color, label };
};
