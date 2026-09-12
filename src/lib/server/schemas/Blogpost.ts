import * as z from 'zod';

export const blogpostSchema = z
	.object({
		title: z.string().min(3, 'Blogpost title is too short.').max(100, 'Blogpost title is too long.').nonoptional(),
		content: z.string().min(3, 'Blogpost content is too short.').nonoptional(),
		ownerId: z.uuid('Invalid ownerId provided.').nonempty('ownerId not provided.').nonoptional('ownerId not provided.')
	})

export type BlogpostSchema = z.infer<typeof blogpostSchema>;