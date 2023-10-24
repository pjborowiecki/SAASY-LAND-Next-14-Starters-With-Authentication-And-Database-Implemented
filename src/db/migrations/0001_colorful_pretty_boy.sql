ALTER TABLE `session` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `user` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `verificationToken` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `emailVerified` timestamp(3) DEFAULT (now());--> statement-breakpoint
ALTER TABLE `session` ADD PRIMARY KEY(`sessionToken`);--> statement-breakpoint
ALTER TABLE `user` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `verificationToken` ADD PRIMARY KEY(`identifier`,`token`);