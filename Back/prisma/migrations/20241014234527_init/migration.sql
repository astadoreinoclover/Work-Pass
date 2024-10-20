/*
  Warnings:

  - You are about to drop the `abilidade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `abilidadeuser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `abilidadeuser` DROP FOREIGN KEY `AbilidadeUser_id_abilidade_fkey`;

-- DropForeignKey
ALTER TABLE `abilidadeuser` DROP FOREIGN KEY `AbilidadeUser_user_id_fkey`;

-- DropTable
DROP TABLE `abilidade`;

-- DropTable
DROP TABLE `abilidadeuser`;

-- CreateTable
CREATE TABLE `Habilidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HabilidadeUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_habilidade` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `xp` INTEGER NOT NULL DEFAULT 0,
    `nivel` INTEGER NOT NULL DEFAULT 1,
    `xpNecessarioParaSubirNivel` INTEGER NOT NULL DEFAULT 50,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HabilidadeUser` ADD CONSTRAINT `HabilidadeUser_id_habilidade_fkey` FOREIGN KEY (`id_habilidade`) REFERENCES `Habilidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HabilidadeUser` ADD CONSTRAINT `HabilidadeUser_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
