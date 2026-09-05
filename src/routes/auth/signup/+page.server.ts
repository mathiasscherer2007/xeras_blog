import { userSignupSchema } from 'schemas/user';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { flattenError } from 'zod';

export const actions: Actions = {
	signup: async ({ request }) => {
		const data = await request.formData();

		const username = data.get('username')?.toString().trim() ?? '';
		const email = data.get('email')?.toString().trim() ?? '';
		const password = data.get('password')?.toString() ?? '';
		const passwordConfirm = data.get('passwordConfirm')?.toString() ?? '';

		console.log(data);

		const result = userSignupSchema.safeParse({
			username: username,
			email: email,
			password: password,
			passwordConfirm: passwordConfirm
		});

		if (!result.success) {
			const flattened = flattenError(result.error);


			return fail(422, {
				error: [
					flattened.fieldErrors.username?.[0],
					flattened.fieldErrors.email?.[0],
					flattened.fieldErrors.password?.[0],
					flattened.fieldErrors.passwordConfirm?.[0]
				].filter(Boolean)
			})
		}
	}
};
