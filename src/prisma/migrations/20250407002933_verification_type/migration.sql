-- CreateEnum
CREATE TYPE "VerificationCodeType" AS ENUM ('EMAIL_VERIFICATION', 'PASSWORD_RESET');

-- AlterTable
ALTER TABLE "VerificationCode" ADD COLUMN     "type" "VerificationCodeType" NOT NULL DEFAULT 'EMAIL_VERIFICATION';
