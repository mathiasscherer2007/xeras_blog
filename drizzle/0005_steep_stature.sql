RENAME TABLE `posts` TO `blogposts`;--> statement-breakpoint
ALTER TABLE `blogposts` DROP FOREIGN KEY `posts_ownerId_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `blogposts` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `blogposts` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `blogposts` ADD CONSTRAINT `blogposts_ownerId_users_id_fk` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE restrict ON UPDATE no action;