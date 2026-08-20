/*
  Warnings:

  - You are about to drop the column `profPicPath` on the `User` table. All the data in the column will be lost.
  - Changed the type of `notifications` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "profPicPath",
ADD COLUMN     "profPicFile" TEXT,
DROP COLUMN "notifications",
ADD COLUMN     "notifications" BOOLEAN NOT NULL;
