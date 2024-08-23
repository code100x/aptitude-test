const Result = ({result}: {result: any}) => {
  return (
    <div className="w-3/5 flex flex-col rounded-xl mx-auto">
      <div className="px-4 py-2 text-xl font-bold bg-[#0081a7] rounded-t-xl text-white">
        Result
      </div>
      <div className="p-4 font-medium bg-[#f8edeb] rounded-b-xl">
          <h1 className="text-6xl font-black">You scored: {result.finalPoints}</h1>
      </div>
    </div>
  );
};

export default Result;
