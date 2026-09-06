import crypto from "node:crypto"
import type { UserRepository } from "repositories/user/UserRepository";
import type { TokenService } from "./TokenService/TokenService";
import { drizzleUserRepository } from "repositories/user/DrizzleUserRepository";
import { jwtTokenService } from "./TokenService/JWTTokenService";
import { EmailAlreadyExistsException, InvalidCredentialsException } from "../exceptions/Exceptions";
import { UserRole } from "../models/enums/UserRole";
import { User } from "../models/User";
import { TokenType } from "../models/enums/TokenType";

export class AuthService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly tokenService: TokenService
	) {}

	public async register(username: string, email: string, password: string): Promise<{
		accessToken: string,
		accessTokenTTL: number,
		refreshToken: string,
		refreshTokenTTL: number,
	}> {
		const emailRegistered = await this.userRepository.findByEmail(email);
		if (emailRegistered) {
			throw new EmailAlreadyExistsException();
		}

		const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

		const user = new User(
			email,
			passwordHash,
			username,
			UserRole.USER
		)

		await this.userRepository.save(user);

		const accessToken = this.tokenService.sign(user, TokenType.ACCESS);
		const refreshToken = this.tokenService.sign(user, TokenType.REFRESH);

		return {
			accessToken: accessToken,
			accessTokenTTL: this.tokenService.getAccessTokenTTL(),
			refreshToken: refreshToken,
			refreshTokenTTL: this.tokenService.getRefreshTokenTTL()
		}
	}

	public async authenticate(email: string, password: string): Promise<{
		accessToken: string,
		accessTokenTTL: number,
		refreshToken: string,
		refreshTokenTTL: number,
	}> {
		const user = await this.userRepository.findByEmail(email);
		if (!user) {
			throw new InvalidCredentialsException();
		}

		const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
		if (passwordHash !== user.getPasswordHash()) {
			throw new InvalidCredentialsException();
		}

		const accessToken = this.tokenService.sign(user, TokenType.ACCESS);
		const refreshToken = this.tokenService.sign(user, TokenType.REFRESH);

		return {
			accessToken: accessToken,
			accessTokenTTL: this.tokenService.getAccessTokenTTL(),
			refreshToken: refreshToken,
			refreshTokenTTL: this.tokenService.getRefreshTokenTTL()
		}		
	}
}

export const authService = new AuthService(drizzleUserRepository, jwtTokenService);