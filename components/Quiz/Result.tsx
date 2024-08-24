const Result = ({ result }: { result: any }) => {
  console.log("result", result);
  return (
    <div className="w-3/5 flex flex-col rounded-xl mx-auto mb-8">
      <div className="px-4 py-2 text-xl font-bold bg-slate-800 text-white dark:bg-slate-200 dark:text-black rounded-t-xl">
        Result
      </div>
      <div className="p-4 font-medium dark:bg-slate-800 bg-slate-200 rounded-b-xl flex flex-col">
        <h1 className="text-6xl font-black text-center">
          You scored: {result.finalPoints}
        </h1>

        <div className="flex flex-col mt-10">
          {result.resultSummary.map((question: any, idx: number) => (
            <div className="flex flex-col mb-6" key={question.questionId}>
              <h2
                className={`text-xl font-bold ${
                  question.selectedOptionId === question.correctOptionId
                    ? "text-green-500"
                    : "text-rose-500"
                }`}
              >
                {idx + 1}. {question.question}
              </h2>
              <h3 className="font-bold">You selected: <span className="font-black text-lg">{question.selectedOptionText}</span></h3>
              <h3 className="font-bold">Correct Answer: <span className="font-black text-lg">{question.correctOptionText}</span></h3>
              <h3 className="font-bold">Info: <span className="font-semibold">{question.explanation}</span></h3>
              <div className="flex items-center mt-1">
                <span className="font-bold mr-2">Topic: </span>
                {question.tags.map((tag: string, idx: number) => (
                  <span key={idx} className="border border-slate-100 p-1 mr-2 rounded-md text-sm items-center">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Result;
