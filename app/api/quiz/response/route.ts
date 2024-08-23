import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db";

interface SaveResponseData {
    userId: string;
    testAttemptId: string;
    questionId: string;
    selectedOptionId: string;
  }

export async function POST(req: NextRequest) {
    try {
      const body: SaveResponseData = await req.json();
  
      const existingResponse = await db.response.findFirst({
        where: {
          testAttemptId: body.testAttemptId,
          questionId: body.questionId,
        },
      });
  
      let response;
  
      if (existingResponse) {
        response = await db.response.update({
          where: {
            id: existingResponse.id,
          },
          data: {
            selectedOptionId: body.selectedOptionId,
          },
        });
      } else {
        response = await db.response.create({
          data: {
            testAttemptId: body.testAttemptId,
            questionId: body.questionId,
            selectedOptionId: body.selectedOptionId,
          },
        });
      }
  
      return NextResponse.json(
        {
          message: "Response saved successfully",
          response,
        },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error saving response:", error);
      return NextResponse.json(
        {
          message: "Failed to save response",
        },
        { status: 500 }
      );
    }
  }
  