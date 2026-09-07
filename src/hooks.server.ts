import type { RouteId } from '$app/types';
import { SubscriberNotFoundException, TokenExpiredException } from '$lib/server/exceptions/Exceptions';
import { TokenType } from '$lib/server/models/enums/TokenType';
import { UserRole } from '$lib/server/models/enums/UserRole';
import type { User } from '$lib/server/models/User';
import { redirect, type Handle } from '@sveltejs/kit';
import { drizzleUserRepository } from 'repositories/user/DrizzleUserRepository';
import { jwtTokenService } from 'services/TokenService/JWTTokenService';

const adminRoutes: Array<RouteId> = [];

const protectedRoutes: Array<RouteId> = ['/blog', ...adminRoutes];

/**
 * Verifies a refresh token. If it's valid, returns a new signed access token.
 * @param refreshToken Refresh token to be checked
 * @returns A new access token and the associated user
 */
async function checkRefreshToken(refreshToken: string): Promise<{ accessToken: string; user: User }> {
	const decoded = jwtTokenService.verify(refreshToken);

	const user = await drizzleUserRepository.findById(decoded.sub!);
	if (!user) throw new SubscriberNotFoundException();

	const newAccessToken = jwtTokenService.sign(user, TokenType.ACCESS);

	return {
		accessToken: newAccessToken,
		user: user
	};
}

export const handle: Handle = async ({ event, resolve }) => {
	const isProtected = protectedRoutes.some((route) => event.url.pathname.startsWith(route));

	if (isProtected) {
		const accessToken = event.cookies.get('access') ?? '';
		const refreshToken = event.cookies.get('refresh') ?? '';

		if (accessToken) {
			try {
				const decoded = jwtTokenService.verify(accessToken);

				event.locals.user = {
					id: decoded.sub!,
					email: decoded.email,
					role: decoded.role
				};
			} catch (error: unknown) {
				if (error instanceof TokenExpiredException) {
					if (refreshToken) {
						const verification = await checkRefreshToken(refreshToken);
						event.cookies.set('access', verification.accessToken, {
							path: '/',
							maxAge: jwtTokenService.getAccessTokenTTL()
						});
						event.locals.user = {
							id: verification.user.getId(),
							email: verification.user.getEmail(),
							role: verification.user.getRole()
						};
					} else {
						throw redirect(303, 'auth/login');
					}
				}
			}
		} else if (refreshToken) {
			const verification = await checkRefreshToken(refreshToken);
			event.cookies.set('access', verification.accessToken, {
				path: '/',
				maxAge: jwtTokenService.getAccessTokenTTL()
			});
			event.locals.user = {
				id: verification.user.getId(),
				email: verification.user.getEmail(),
				role: verification.user.getRole()
			};
		} else {
			throw redirect(303, '/auth/login');
		}

		const isAdminRoute = adminRoutes.some((route) => event.url.pathname.startsWith(route));
		if (isAdminRoute) {
			if (event.locals.user?.role == UserRole.ADMIN) {
				console.log("welcome in!");
			} else {
				throw redirect(303, protectedRoutes[0]);
			}
		}
	}

	return resolve(event);
};
