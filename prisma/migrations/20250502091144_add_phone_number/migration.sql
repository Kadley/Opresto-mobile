/*
  Warnings:

  - Added the required column `phone` to the `manager` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "manager" ADD COLUMN     "phone" TEXT NOT NULL;
