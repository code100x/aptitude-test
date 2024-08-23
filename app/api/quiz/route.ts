import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authConfig);

  if (!session?.user) {
    return NextResponse.json(
      { message: "You're not logged in" },
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

    responses.forEach((response) => {
      totalPoints += response.question.points;
      if (response.selectedOptionId === response.question.correctOptionId) {
        earnedPoints += response.question.points;
      }
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
