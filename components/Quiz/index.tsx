"use client";

import { useState } from "react";
import MainSection from "./MainSection";
import SecondarySection from "./SecondarySection";
import Result from "./Result";

const Quiz = () => {
  //   window.onbeforeunload = function () {
  //     return "Data will be lost if you leave the page, are you sure?";
  //   };

  const [result, setResult] = useState();
  return (
    <div className="flex min-w-full">
      {result ? (
        <Result result={result} />
      ) : (
        <>
          <div className="w-3/4">
            <MainSection setResult={setResult}/>
          </div>
          <div className="w-1/4">
            <SecondarySection />
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
