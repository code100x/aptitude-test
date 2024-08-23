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
    <div className="flex flex-col pl-10">
      <div className="flex flex-col mt-6">
        <div className="px-4 py-2 text-xl font-bold bg-[#0081a7] rounded-t-xl text-white">
          Time
        </div>
        <div className="p-4 text-3xl font-bold bg-[#f8edeb] rounded-b-xl text-center">
          {formatTime(timeLeft)}
        </div>
      </div>
    </div>
  );
};

export default SecondarySection;
