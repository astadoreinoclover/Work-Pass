/*
  Warnings:

  - You are about to alter the column `funcao` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `funcao` VARCHAR(191) NOT NULL;
