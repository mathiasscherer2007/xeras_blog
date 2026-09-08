import type { BlogpostRepository } from "repositories/blogpost/BlogpostRepository";
import type { UserRepository } from "repositories/user/UserRepository";
import { Blogpost } from "../models/Blogpost";
import { BlogpostOverview } from "../models/BlogpostOverview";
import { drizzleBlogpostRepository } from "repositories/blogpost/DrizzleBlogpostRepository";
import { drizzleUserRepository } from "repositories/user/DrizzleUserRepository";
import type { User } from "../models/User";

export class BlogpostService {
	constructor( 
		private readonly blogpostRepository: BlogpostRepository, 
		private readonly userRepository: UserRepository
	) {}

	public async createBlogpost(ownerId: string, title: string, content: string): Promise<Blogpost> {
		const createdBlogpost = await this.blogpostRepository.save(new Blogpost(title, content, ownerId));
		return createdBlogpost;
	}

	public async getOverviews(amount?: number): Promise<Array<BlogpostOverview> | null> {
		const rows = await this.blogpostRepository.getLatestBlogposts(amount);

		if (!rows) {
			return null;
		}

		const overviews = rows.map(post => new BlogpostOverview(post.getId(), post.getSlug(), post.getTitle(), post.getOwnerId(), post.getCreatedAt() ?? new Date()));

		return overviews;
	}

	public async getBySlug(slug: string): Promise<{ blogpost: Blogpost, owner: User | null } | null> {
		const blogpost = await this.blogpostRepository.findBySlug(slug);

		if (!blogpost) {
			return null;
		}

		const owner = await this.userRepository.findById(blogpost?.getOwnerId() ?? '');

		return {
			blogpost: blogpost,
			owner: owner
		}
	}
}

export const blogpostService = new BlogpostService(drizzleBlogpostRepository, drizzleUserRepository);