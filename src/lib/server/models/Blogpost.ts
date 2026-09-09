import { convertToSlug } from '$lib/utils/ConvertToSlug';
import type { Model } from './Model';

interface BlogpostPrimitve {
	id: string;
	ownerId: string;
	title: string;
	content: string;
	slug: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export class Blogpost implements Model<BlogpostPrimitve> {
	private id: string;
	private ownerId: string;
	private title: string;
	private content: string;
	private slug: string;
	private createdAt?: Date;
	private updatedAt?: Date;

	constructor(
		title: string,
		content: string,
		ownerId: string,
		id?: string,
		slug?: string,
		createdAt?: Date,
		updatedAt?: Date
	) {
		this.id = id ?? crypto.randomUUID();
		this.title = title;
		this.content = content;
		this.slug = slug ?? convertToSlug(this.title);
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
	public getSlug(): string {
		return this.slug;
	}
	public getCreatedAt(): Date | undefined {
		return this.createdAt;
	}
	public getUpdatedAt(): Date | undefined {
		return this.updatedAt;
	}

	public getPrimitve(): BlogpostPrimitve {
		return {
			id: this.id,
			ownerId: this.ownerId,
			slug: this.slug,
			title: this.title,
			content: this.content,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt
		};
	}
}
