ALTER TABLE `user` ADD `emailVerificationToken` varchar(255);--> statement-breakpoint
ALTER TABLE `user` ADD CONSTRAINT `user_emailVerificationToken_unique` UNIQUE(`emailVerificationToken`);