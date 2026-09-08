import { blogposts } from '$lib/server/db/blogposts';
import { Blogpost } from '$lib/server/models/Blogpost';
import { desc, eq } from 'drizzle-orm';
import type { BlogpostRepository } from './BlogpostRepository';
import { db } from 'db';

export class DrizzleBlogpostRepository implements BlogpostRepository {
	async getLatestBlogposts(amount?: number): Promise<Array<Blogpost> | null> {
		const query = db.select().from(blogposts).orderBy(desc(blogposts.createdAt));

		if (amount && amount > 0) {
			query.limit(amount);
		}

		const rows = await query;

		if (rows.length === 0) {
			return null;
		}

		const latestBlogposts = rows.map(blogpost => new Blogpost(blogpost.title, blogpost.content, blogpost.ownerId, blogpost.id, blogpost.createdAt, blogpost.updatedAt));

		return latestBlogposts;
	}

	async findById(id: string): Promise<Blogpost | null> {
		const rows = await db.select().from(blogposts).where(eq(blogposts.id, id));

		if (rows.length === 0) {
			return null;
		}

		const result = rows[0];

		return new Blogpost(
			result.title,
			result.content,
			result.ownerId,
			result.id,
			result.createdAt,
			result.updatedAt
		);
	}

	async findByOwnerId(ownerId: string): Promise<Array<Blogpost> | null> {
		const rows = await db.select().from(blogposts).where(eq(blogposts.ownerId, ownerId));

		if (rows.length === 0) {
			return null;
		}

		const searchedBlogposts = rows.map((blogpost) => new Blogpost(blogpost.title, blogpost.content, blogpost.ownerId, blogpost.id, blogpost.createdAt, blogpost.updatedAt));

		return searchedBlogposts;
	}

	async save(blogpost: Blogpost): Promise<Blogpost> {
		await db.insert(blogposts).values({
			ownerId: blogpost.getOwnerId(),
			title: blogpost.getTitle(),
			content: blogpost.getContent()
		});

		return blogpost;
	}

	async update(blogpost: Blogpost): Promise<void> {
		const values = {
			id: blogpost.getId(),
			ownerId: blogpost.getOwnerId(),
			title: blogpost.getTitle(),
			content: blogpost.getContent()
		};
		await db.update(blogposts).set(values).where(eq(blogposts.id, values.id));
	}
}

export const drizzleBlogpostRepository = new DrizzleBlogpostRepository();