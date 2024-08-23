import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db";
import { Difficulty, Prisma } from "@prisma/client";

interface QuestionData {
    question: string;
    image?: string;
    video?: string;
    options: Prisma.JsonArray;
    correctOptionId: string;
    category: string;
    difficulty: Difficulty;
    points: number;
    explanation?: string;
    tags?: Prisma.JsonArray;
    timeLimit?: number;
  }

export async function POST(req: NextRequest) {
  const session = await getServerSession(authConfig);

  if (!session?.user) {
    return NextResponse.json(
      {
        message: "You're not logged in",
      },
      { status: 401 }
    );
  }

  const user = await db.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  if (user?.role !== "Admin") {
    return NextResponse.json(
      {
        message: "Unauthorised",
      },
      { status: 401 }
    );
  }

  try {
    const body: QuestionData = await req.json();

    const newQuestion = await db.question.create({
      data: {
        ...body,
        tags: body.tags ?? [],
        createdBy: user.email,
      },
    });

    return NextResponse.json(
      { message: "Question added", newQuestion },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      {
        message: "Failed to create question",
      },
      {
        status: 500,
      }
    );
  }
}
