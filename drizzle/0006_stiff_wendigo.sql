ALTER TABLE `blogposts` MODIFY COLUMN `title` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `blogposts` ADD `slug` varchar(255) NOT NULL;