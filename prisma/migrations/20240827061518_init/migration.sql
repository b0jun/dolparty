-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('D1', 'D2', 'D3', 'D4', 'D5');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Men', 'Women');

-- CreateTable
CREATE TABLE "Contestant" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "phonenumber" VARCHAR(30),
    "difficulty" "Difficulty" NOT NULL,
    "gender" "Gender" NOT NULL,

    CONSTRAINT "Contestant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" SERIAL NOT NULL,
    "contestantId" TEXT NOT NULL,
    "problemId" INTEGER NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "TopReached" BOOLEAN NOT NULL DEFAULT false,
    "ZoneReached" BOOLEAN NOT NULL DEFAULT false,
    "TopAttempts" INTEGER NOT NULL DEFAULT 0,
    "ZoneAttempts" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Problem" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(10) NOT NULL,
    "difficulties" "Difficulty"[],

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contestant_number_key" ON "Contestant"("number");

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_contestantId_fkey" FOREIGN KEY ("contestantId") REFERENCES "Contestant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
