export enum QuestionStatus {
  Answered = "answered",
  Default = "default",
  ReviewWithAnswer = "reviewWithAnswer",
  ReviewWithoutAnswer = "reviewWithoutAnswer",
  Visited = "visited",
}

export interface QuizOption {
  id: number;
  text: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
  selectedOptionId: number | null;
  status: QuestionStatus | string;
  markedForReview: boolean;
}
