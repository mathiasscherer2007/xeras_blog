import { UserRole } from './enums/UserRole';
import { UserStatus } from './enums/UserStatus';

export class User {
	private id: string;
	private email: string;
	private passwordHash: string;
	private username: string;
	private status: UserStatus;
	private role: UserRole;
	private createdAt?: Date;
	private updatedAt?: Date;

	constructor(
		email: string,
		passwordHash: string,
		username: string,
		role: UserRole,
		id?: string,
		status?: UserStatus,
		createdAt?: Date,
		updatedAt?: Date
	) {
		this.id = id ?? crypto.randomUUID();
		this.email = email;
		this.passwordHash = passwordHash;
		this.username = username;
		this.role = role;
		this.status = status ?? UserStatus.ACTIVE;
		this.createdAt = createdAt ?? new Date();
		this.updatedAt = updatedAt ?? new Date();
	}

	public getId(): string {
		return this.id;
	}
	public getEmail(): string {
		return this.email;
	}
	public getPasswordHash(): string {
		return this.passwordHash;
	}
	public getUsername(): string {
		return this.username;
	}
	public getRole(): UserRole {
		return this.role;
	}
	public getStatus(): UserStatus {
		return this.status;
	}

	public setStatus(status: UserStatus): void {
		this.status = status;
	}
}
