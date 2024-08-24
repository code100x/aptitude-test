import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db";
import { Option } from "@/components/Quiz/MainSection";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authConfig);

  if (!session?.user) {
    return NextResponse.json(
      { message: "You're not logged in" },
      { status: 401 }
    );
  }

  const user = await db.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  if (!user || session?.user?.email !== user.email) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  try {
    const { testAttemptId } = await req.json();

    const responses = await db.response.findMany({
      where: { testAttemptId },
      include: {
        question: true,
      },
    });

    let totalPoints = 0;
    let earnedPoints = 0;

    const resultSummary: any = [];

    responses.forEach((response) => {
      totalPoints += response.question.points;
      if (response.selectedOptionId === response.question.correctOptionId) {
        earnedPoints += response.question.points;
      }

      const options = response.question.options as Option[];

      const selectedOptionText = options.find((option: Option) => option.optionId === response.selectedOptionId)?.text;
      const correctOptionText = options.find((option: Option) => option.optionId === response.question.correctOptionId)?.text;

      resultSummary.push({
        questionId: response.questionId,
        question: response.question.question,
        selectedOptionId: response.selectedOptionId,
        selectedOptionText,
        correctOptionId: response.question.correctOptionId,
        correctOptionText,
        explanation: response.question.explanation,
        tags: response.question.tags,
        category: response.question.category
      })
    });

    const percentageScore = (earnedPoints / totalPoints) * 100;

    const updatedTestAttempt = await db.testAttempt.update({
      where: { id: testAttemptId },
      data: { finalPoints: earnedPoints },
    });

    return NextResponse.json(
      {
        message: "Quiz submitted successfully",
        finalPoints: earnedPoints,
        percentage: percentageScore,
        resultSummary
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting quiz", error);
    return NextResponse.json(
      { message: "Failed to submit quiz" },
      { status: 500 }
    );
  }
}
