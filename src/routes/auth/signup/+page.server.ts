import { userSignupSchema } from 'schemas/User';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { flattenError } from 'zod';
import { authService } from 'services/AuthService';
import { resolve } from '$app/paths';
import { EmailAlreadyExistsException } from '$lib/server/exceptions/Exceptions';

export const actions: Actions = {
	signup: async ({ request, cookies }) => {
		await new Promise(resolve => setTimeout(resolve, 1000));
		
		const data = await request.formData();

		const username = data.get('username')?.toString().trim() ?? '';
		const email = data.get('email')?.toString().trim() ?? '';
		const password = data.get('password')?.toString() ?? '';
		const passwordConfirm = data.get('passwordConfirm')?.toString() ?? '';

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

		try {
			const response = await authService.register(result.data.username, result.data.email, result.data.password);

			cookies.set('access', response.accessToken, { path: '/', maxAge: response.accessTokenTTL });
			cookies.set('refresh', response.refreshToken, { path: '/', maxAge: response.refreshTokenTTL });
		} catch (error: unknown) {
			if (error instanceof EmailAlreadyExistsException) {
				return fail(error.statusCode, { error: [error.message] });
			}

			return fail(400, { error: ["Something went wrong."] });
		}

		throw redirect(303, resolve('/blog'));
	}
};
