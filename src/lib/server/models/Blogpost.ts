export class Blogpost {
	private id: string;
	private ownerId: string;
	private title: string;
	private content: string;
	private createdAt?: Date;
	private updatedAt?: Date;

	constructor(
		title: string,
		content: string,
		ownerId: string,
		id?: string,
		createdAt?: Date,
		updatedAt?: Date
	) {
		this.id = id ?? crypto.randomUUID();
		this.title = title;
		this.content = content;
		this.ownerId = ownerId;
		this.createdAt = createdAt ?? new Date();
		this.updatedAt = updatedAt ?? new Date();
	}

	public getId(): string {
		return this.id;
	}
	public getOwnerId(): string {
		return this.ownerId;
	}
	public getTitle(): string {
		return this.title;
	}
	public getContent(): string {
		return this.content;
	}
	public getCreatedAt(): Date | undefined {
		return this.createdAt;
	}
	public getUpdatedAt(): Date | undefined {
		return this.updatedAt;
	}
}