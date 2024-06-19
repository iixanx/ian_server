/*
  Warnings:

  - Added the required column `secret` to the `otp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `otp` ADD COLUMN `secret` VARCHAR(191) NOT NULL;
