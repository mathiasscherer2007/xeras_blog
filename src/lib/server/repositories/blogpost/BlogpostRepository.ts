import type { Blogpost } from "$lib/server/models/Blogpost";

export interface BlogpostRepository {
	getLatestBlogposts(amount?: number): Promise<Array<Blogpost> | null>;
	findById(id: string): Promise<Blogpost | null>;
	findByOwnerId(ownerId: string): Promise<Array<Blogpost> | null>;
	save(blogpost: Blogpost): Promise<Blogpost>;
	update(blogpost: Blogpost): Promise<void>;
}