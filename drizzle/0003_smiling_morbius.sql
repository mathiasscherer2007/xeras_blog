CREATE TABLE `users` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`email` varchar(320) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	`username` varchar(128) NOT NULL,
	`status` enum('active','inactive') NOT NULL DEFAULT 'active',
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_idx` UNIQUE(`email`)
);
--> statement-breakpoint
DROP TABLE `account`;--> statement-breakpoint
DROP TABLE `session`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
DROP TABLE `verification`;--> statement-breakpoint
CREATE INDEX `status_idx` ON `users` (`status`);