import { NextResponse } from "next/server";
import db from "@/app/db";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authConfig);

  if (!session?.user) {
    return NextResponse.json(
      { message: "You're not logged in" },
      { status: 401 }
    );
  }

  const user = await db.user.findFirst({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  let newTestAttempt;
  try {
    newTestAttempt = await db.testAttempt.create({
      data: {
        userId: user.id,
        finalPoints: 0,
      },
    });
  } catch (error) {
    console.error("Error creating test attempt", error);
    return NextResponse.json(
      { message: "Failed to start test attempt" },
      { status: 500 }
    );
  }

  try {
    const questions = await db.question.findMany({
      select: {
        id: true,
        question: true,
        image: true,
        video: true,
        options: true,
        points: true,
        timeLimit: true,
      },
    });

    return NextResponse.json(
      {
        message: "Questions fetched successfully",
        newTestAttempt: {
          testId: newTestAttempt.id,
          user: newTestAttempt.userId,
          date: newTestAttempt.testDate,
        },
        questions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch questions",
      },
      { status: 500 }
    );
  }
}
