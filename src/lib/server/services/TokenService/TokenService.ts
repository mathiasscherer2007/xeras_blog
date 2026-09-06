import type { TokenType } from "$lib/server/models/enums/TokenType";
import type { User } from "$lib/server/models/User";
import type { JwtPayload } from "jsonwebtoken";

export interface TokenService {
	verify(token: string): JwtPayload;
	decode(token: string): JwtPayload;
	sign(user: User, tokenType: TokenType): string;

	getAccessTokenTTL(): number;
	getRefreshTokenTTL(): number;
}