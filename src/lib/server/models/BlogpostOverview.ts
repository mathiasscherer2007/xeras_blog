import type { Model } from './Model';

interface BlogpostOverviewPrimitive {
	id: string;
	slug: string;
	title: string;
	ownerId: string;
	createdAt: Date;
}

/**
 * An interface for blogpost overviews seen on /blog, for example. Doesn't return the (possibly) big markdown in the content.
 */
export class BlogpostOverview implements Model<BlogpostOverviewPrimitive> {
	constructor(
		public id: string,
		public slug: string,
		public title: string,
		public ownerId: string,
		public createdAt: Date
	) {}

	public getPrimitve(): BlogpostOverviewPrimitive {
		return {
			id: this.id,
			slug: this.slug,
			title: this.title,
			ownerId: this.ownerId,
			createdAt: this.createdAt
		};
	}
}
