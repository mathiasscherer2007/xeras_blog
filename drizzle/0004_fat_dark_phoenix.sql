CREATE TABLE `posts` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`ownerId` varchar(36) NOT NULL,
	`title` varchar(100) NOT NULL,
	`content` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `posts` ADD CONSTRAINT `posts_ownerId_users_id_fk` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE restrict ON UPDATE no action;