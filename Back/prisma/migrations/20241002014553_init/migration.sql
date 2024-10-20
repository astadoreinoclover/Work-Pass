/*
  Warnings:

  - Added the required column `dataNascimento` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departamento` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_empresa` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `dataNascimento` DATETIME(3) NOT NULL,
    ADD COLUMN `departamento` VARCHAR(191) NOT NULL,
    ADD COLUMN `id_empresa` INTEGER NOT NULL,
    ADD COLUMN `numero` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Empresa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(191) NOT NULL,
    `departamentos` VARCHAR(191) NOT NULL,
    `dataContratacao` DATETIME(3) NOT NULL,
    `tempoDeContrato` INTEGER NOT NULL,
    `statusDoPlano` ENUM('ATIVO', 'VENCIDO') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Empresa_cnpj_key`(`cnpj`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Endereco` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,
    `rua` VARCHAR(191) NOT NULL,
    `complemento` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `pais` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoria` ENUM('LOGIN', 'LOGOUT', 'TASK_CREATED', 'TASK_UPDATED', 'TASK_COMPLETED', 'FUNCIONARIO_CADASTRADO', 'GERENTE_CADASTRADO', 'FUNCIONARIO_EXCLUIDO', 'ACESSO_MODIFICADO', 'DADOS_EDITADOS', 'SUBIU_NIVEL', 'NOVA_HABILIDADE', 'TROCA_SENHA', 'TASK_CONCLUIDA') NOT NULL,
    `user_id` INTEGER NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `dataHora` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `valorEntrega` INTEGER NOT NULL,
    `habilidadeId` INTEGER NOT NULL,
    `tipoEntrega` VARCHAR(191) NOT NULL,
    `dataFinal` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserTask` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `task_id` INTEGER NOT NULL,
    `status` ENUM('EM_ANDAMENTO', 'CONCLUIDA', 'NAO_ENTREGUE') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Gaming` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `xp` INTEGER NOT NULL DEFAULT 0,
    `nivel` INTEGER NOT NULL DEFAULT 1,
    `user_id` INTEGER NOT NULL,
    `xpNecessarioParaSubirNivel` INTEGER NOT NULL DEFAULT 50,

    UNIQUE INDEX `Gaming_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlanoDeCarreira` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `funcaoDesejada` VARCHAR(191) NOT NULL,
    `departamento` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PlanoDeCarreira_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Abilidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AbilidadeUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_abilidade` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `xp` INTEGER NOT NULL DEFAULT 0,
    `nivel` INTEGER NOT NULL DEFAULT 1,
    `xpNecessarioParaSubirNivel` INTEGER NOT NULL DEFAULT 50,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_id_empresa_fkey` FOREIGN KEY (`id_empresa`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Log` ADD CONSTRAINT `Log_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTask` ADD CONSTRAINT `UserTask_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTask` ADD CONSTRAINT `UserTask_task_id_fkey` FOREIGN KEY (`task_id`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Gaming` ADD CONSTRAINT `Gaming_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlanoDeCarreira` ADD CONSTRAINT `PlanoDeCarreira_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AbilidadeUser` ADD CONSTRAINT `AbilidadeUser_id_abilidade_fkey` FOREIGN KEY (`id_abilidade`) REFERENCES `Abilidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AbilidadeUser` ADD CONSTRAINT `AbilidadeUser_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
