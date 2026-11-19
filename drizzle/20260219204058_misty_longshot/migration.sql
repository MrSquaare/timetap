PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`datetime` integer NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`category_id` integer NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_events`("id", "datetime", "description", "category_id") SELECT "id", "datetime", "description", "category_id" FROM `events`;--> statement-breakpoint
DROP TABLE `events`;--> statement-breakpoint
ALTER TABLE `__new_events` RENAME TO `events`;--> statement-breakpoint
PRAGMA foreign_keys=ON;