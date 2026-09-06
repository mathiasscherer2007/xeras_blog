import { userLoginSchema } from 'schemas/user';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { flattenError } from 'zod';

export const actions: Actions = {
	login: async ({ request }) => {
		await new Promise(resolve => setTimeout(resolve, 3000));

		const data = await request.formData();

		const email = data.get('email')?.toString().trim() ?? '';
		const password = data.get('password')?.toString() ?? '';

		const result = userLoginSchema.safeParse({
			email: email,
			password: password
		});

		if (!result.success) {
			const flattened = flattenError(result.error);

			return fail(422, {
				error: [
					flattened.fieldErrors.email?.[0],
					flattened.fieldErrors.password?.[0]
				].filter(Boolean)
			})
		}
	}
};
