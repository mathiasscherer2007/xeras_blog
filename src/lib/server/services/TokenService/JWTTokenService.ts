import jwt, { type JwtPayload } from 'jsonwebtoken';
import type { TokenService } from './TokenService';
import { TokenType } from '$lib/server/models/enums/TokenType';
import type { User } from '$lib/server/models/User';
import { InvalidTokenException } from '$lib/server/exceptions/Exceptions';
import { env } from '$env/dynamic/private';

export class JWTTokenService implements TokenService {
	private readonly secret: string;
	private readonly accessTokenTTL = 1000 * 60 * 20; // 20 minutes of TTL for access token
	private readonly refreshTokenTTL = 1000 * 60 * 60 * 24; // 1 day of TTL for refresh token

	constructor(secret: string) {
		this.secret = secret;
	}

	public verify(token: string): JwtPayload {
		try {
			return jwt.verify(token, this.secret) as JwtPayload;
		} catch {
			throw new InvalidTokenException();
		}
	}

	public decode(token: string): JwtPayload {
		return jwt.decode(token) as JwtPayload;
	}

	public sign(user: User, tokenType: TokenType): string {
		return jwt.sign(
			{
				sub: user.getId(),
				email: user.getEmail(),
				role: user.getRole()
			},
			this.secret,
			{
				algorithm: 'HS256',
				jwtid: crypto.randomUUID(),
				expiresIn: tokenType === TokenType.REFRESH ? this.refreshTokenTTL : this.accessTokenTTL
			}
		);
	}

	public getAccessTokenTTL(): number {
		return this.accessTokenTTL;
	}
	public getRefreshTokenTTL(): number {
		return this.refreshTokenTTL;
	}
}

export const jwtTokenService = new JWTTokenService(env.API_SECRET);