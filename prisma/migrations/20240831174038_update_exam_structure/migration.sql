/*
  Warnings:

  - You are about to drop the column `questions` on the `exams` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "exam_submissions" DROP CONSTRAINT "exam_submissions_examId_fkey";

-- AlterTable
ALTER TABLE "exam_submissions" ADD COLUMN     "questions" TEXT[];

-- AlterTable
ALTER TABLE "exams" DROP COLUMN "questions",
ADD COLUMN     "numQuestions" INTEGER NOT NULL DEFAULT 1;
