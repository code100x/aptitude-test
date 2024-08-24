"use client";

import React from "react";
import QuizComponent from "../../components/QuizComponent";
import useFullScreen from "../../hooks/useFullScreen";

const Quiz = () => {
  useFullScreen();

  return <QuizComponent />;
};

export default Quiz;
