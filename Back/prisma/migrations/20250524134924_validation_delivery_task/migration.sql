-- AlterTable
ALTER TABLE `usertask` ADD COLUMN `finalizado` ENUM('TRUE', 'FALSE') NOT NULL DEFAULT 'FALSE';
