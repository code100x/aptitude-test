"use client";

import { useEffect, useState } from "react";

const SecondarySection = () => {
  const [timeLeft, setTimeLeft] = useState<number>(2 * 60 * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${secs}`;
  };

  return (
    <div className="flex flex-col ml-10 p-6 rounded-2xl bg-slate-100 dark:bg-slate-900">
      <div className="flex flex-col">
        <div className="px-4 py-2 text-xl font-bold bg-slate-800 text-white dark:bg-slate-200 dark:text-black rounded-t-xl">
          Time
        </div>
        <div className="p-4 text-3xl font-bold dark:bg-slate-800 bg-slate-200 rounded-b-xl text-center">
          {formatTime(timeLeft)}
        </div>
      </div>
    </div>
  );
};

export default SecondarySection;
