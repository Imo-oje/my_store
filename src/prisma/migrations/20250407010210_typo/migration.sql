/*
  Warnings:

  - You are about to drop the column `ceatedAt` on the `VerificationCode` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "VerificationCode" DROP COLUMN "ceatedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
