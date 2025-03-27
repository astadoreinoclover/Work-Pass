/*
  Warnings:

  - You are about to drop the `endereco` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `endereco` DROP FOREIGN KEY `Endereco_id_user_fkey`;

-- DropTable
DROP TABLE `endereco`;
