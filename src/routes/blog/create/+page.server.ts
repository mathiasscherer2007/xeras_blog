import { blogpostSchema } from 'schemas/Blogpost';
import type { Actions } from './$types';
import { flattenError } from 'zod';
import { fail, isRedirect, redirect } from '@sveltejs/kit';
import { blogpostService } from 'services/BlogpostService';

export const actions: Actions = {
	create: async ({ request, locals }) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const data = await request.formData();

		const title = data.get('title')?.toString() ?? '';
		const content = data.get('content')?.toString() ?? '';
		const ownerId = locals.user?.id ?? '';

		const result = blogpostSchema.safeParse({
			title: title,
			content: content,
			ownerId: ownerId
		});

		console.log(result)

		if (!result.success) {
			const flattened = flattenError(result.error);

			return fail(422, {
				error: [flattened.fieldErrors.title?.[0], flattened.fieldErrors.content?.[0]].filter(
					Boolean
				)
			});
		}

		try {
			const response = await blogpostService.createBlogpost(result.data.ownerId, result.data.title, result.data.content);
			const createdAt = response.getCreatedAt();
			const formattedLink = String(createdAt?.getFullYear() + '/' + createdAt?.getMonth().toString().padStart(2, '0') + '/' + createdAt?.getDate().toString().padStart(2, '0') + '/' + response.getSlug());
			throw redirect(303, `/blog/${formattedLink}`);
		} catch (error: unknown) {
			if (isRedirect(error)) {
				throw error;
			}

			
		}
	}
};
