/**
 * An interface for blogpost overviews seen on /blog, for example. Doesn't return the (possibly) big markdown in the content.
 */
export class BlogpostOverview {
	constructor(
		public id: string,
		public slug: string,
		public title: string,
		public ownerId: string,
		public createdAt: Date
	) {}

	/**
	 * @returns a primitive JS object of the instance
	 */
	public getPrimitive() {
		return {
			id: this.id,
			slug: this.slug,
			title: this.title,
			ownerId: this.ownerId,
			createdAt: this.createdAt
		}
	}
}