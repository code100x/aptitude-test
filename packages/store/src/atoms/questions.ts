import { atom } from "recoil";
import { DUMMY_QUESTIONS_DATA } from "./constant";

import { QuizQuestion } from "../../../common/src";

export const questionsData = atom<QuizQuestion[]>({
  key: "questionsData",
  default: DUMMY_QUESTIONS_DATA as QuizQuestion[],
});

export const currentQuestionId = atom<number | null>({
  key: "currentQuestionId",
  default: null,
});
