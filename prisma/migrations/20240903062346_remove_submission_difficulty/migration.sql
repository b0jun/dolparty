/*
  Warnings:

  - You are about to drop the column `phonenumber` on the `Contestant` table. All the data in the column will be lost.
  - You are about to drop the column `difficulty` on the `Submission` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[contestantId,problemId]` on the table `Submission` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Contestant" DROP COLUMN "phonenumber";

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "difficulty";

-- CreateIndex
CREATE UNIQUE INDEX "Submission_contestantId_problemId_key" ON "Submission"("contestantId", "problemId");
