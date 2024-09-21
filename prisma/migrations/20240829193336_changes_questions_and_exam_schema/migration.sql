/*
  Warnings:

  - You are about to drop the column `examId` on the `questions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_examId_fkey";

-- DropIndex
DROP INDEX "questions_examId_idx";

-- AlterTable
ALTER TABLE "exams" ADD COLUMN     "questions" TEXT[];

-- AlterTable
ALTER TABLE "questions" DROP COLUMN "examId",
ADD COLUMN     "image" TEXT;
