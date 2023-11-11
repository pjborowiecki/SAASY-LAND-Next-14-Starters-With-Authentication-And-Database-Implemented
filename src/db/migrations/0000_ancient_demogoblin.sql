CREATE TABLE `account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` varchar(255),
	`access_token` varchar(255),
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` varchar(255),
	`session_state` varchar(255),
	CONSTRAINT `account_provider_providerAccountId_pk` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `newsletterSubscriber` (
	`email` varchar(255) NOT NULL,
	`createdAt` timestamp(3) DEFAULT (now()),
	CONSTRAINT `newsletterSubscriber_email` PRIMARY KEY(`email`),
	CONSTRAINT `newsletterSubscriber_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerificationToken` varchar(255),
	`emailVerified` timestamp(3),
	`passwordHash` text,
	`resetPasswordToken` varchar(255),
	`resetPasswordTokenExpires` timestamp(3),
	`image` varchar(255),
	`createdAt` timestamp(3) DEFAULT (now()),
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_emailVerificationToken_unique` UNIQUE(`emailVerificationToken`),
	CONSTRAINT `user_resetPasswordToken_unique` UNIQUE(`resetPasswordToken`)
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `verificationToken_identifier_token_pk` PRIMARY KEY(`identifier`,`token`)
);
