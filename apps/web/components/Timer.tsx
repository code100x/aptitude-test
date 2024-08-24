"use client";

import React, { useState, useEffect } from "react";

interface TimerProps {
  /** duration in seconds */
  duration: number;
  /** callback when the timer completes */
  onComplete: () => void;
}

const Timer: React.FC<TimerProps> = (props) => {
  const { duration, onComplete } = props;

  const [timeRemaining, setTimeRemaining] = useState<number>(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          onComplete(); // Call the callback when timer completes
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Clean up interval on component unmount or timer completion
    return () => clearInterval(interval);
  }, [duration, onComplete]);

  // Convert seconds to hh:mm:ss for display
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center gap-4 p-4">
      <h1 className="text-xl">Time Remaining:</h1>
      <h1 className="text-2xl">{formatTime(timeRemaining)}</h1>
    </div>
  );
};

export default Timer;
