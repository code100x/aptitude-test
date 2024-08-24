/*
  Warnings:

  - You are about to drop the column `dateCreated` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `lastUpdated` on the `Question` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `attemptTimestamp` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `disconnectionTimestamp` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `testSubmitted` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TestStatus" AS ENUM ('Interrupted', 'NotStarted', 'Submitted');

-- AlterTable
ALTER TABLE "Option" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "dateCreated",
DROP COLUMN "lastUpdated",
ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "video" TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "attemptTimestamp",
DROP COLUMN "disconnectionTimestamp",
DROP COLUMN "testSubmitted",
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "testStatus" "TestStatus",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";
