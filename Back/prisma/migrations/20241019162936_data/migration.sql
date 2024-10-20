-- AlterTable
ALTER TABLE `user` MODIFY `dataNascimento` VARCHAR(191) NOT NULL;

ALTER TABLE `User` ADD COLUMN `funcao` VARCHAR(255) NOT NULL DEFAULT 'Sem_Função_Definida';

