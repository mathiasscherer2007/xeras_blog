import { userLoginSchema } from 'schemas/User';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { flattenError } from 'zod';
import { authService } from 'services/AuthService';
import { InvalidCredentialsException } from '$lib/server/exceptions/Exceptions';
import { resolve } from '$app/paths';

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		await new Promise(resolve => setTimeout(resolve, 1000));

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

		try {
			const response = await authService.authenticate(result.data.email, result.data.password);

			cookies.set('access', response.accessToken, { path: '/', maxAge: response.accessTokenTTL });
			cookies.set('refresh', response.refreshToken, { path: '/', maxAge: response.refreshTokenTTL });
		} catch (error: unknown) {
			if (error instanceof InvalidCredentialsException) {
				return fail(error.statusCode, { error: [error.message] });
			}

			return fail(400, { error: ["Something went wrong."] });
		}

		throw redirect(303, resolve('/auth/signup'));
	}
};
