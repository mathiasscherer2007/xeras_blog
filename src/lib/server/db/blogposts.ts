import {
	mysqlTable,
	varchar,
	timestamp,
	text
} from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';
import { users } from './users';

export const blogposts = mysqlTable(
	'blogposts',
	{
		id: varchar('id', { length: 36 }).primaryKey().default(sql`(UUID())`),
		ownerId: varchar('ownerId', { length: 36 }).references(() => users.id, { onDelete: 'restrict' }).notNull(),
		title: varchar('title', { length: 100 }).notNull(),
		content: text('content').notNull(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at').defaultNow().notNull()
	}
);
