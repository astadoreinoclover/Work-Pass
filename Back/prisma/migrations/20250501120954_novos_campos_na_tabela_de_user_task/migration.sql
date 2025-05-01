-- AlterTable
ALTER TABLE `usertask` ADD COLUMN `delivery_type` ENUM('PDF', 'LINK', 'IMG', 'META') NOT NULL DEFAULT 'PDF',
    ADD COLUMN `meta_type` ENUM('VALUE', 'ENTREGA') NULL,
    ADD COLUMN `meta_value` VARCHAR(191) NULL;
