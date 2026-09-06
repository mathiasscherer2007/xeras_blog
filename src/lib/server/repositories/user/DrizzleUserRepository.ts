import { User } from '$lib/server/models/User';
import { db } from 'db';
import type { UserRepository } from './UserRepository';
import { users } from '$lib/server/db/users';
import { UserStatus } from '$lib/server/models/enums/UserStatus';
import { and, eq } from 'drizzle-orm';
import type { UserRole } from '$lib/server/models/enums/UserRole';

export class DrizzleUserRepository implements UserRepository {
	public async findById(id: string): Promise<User | null> {
		const rows = await db
			.select()
			.from(users)
			.where(and(eq(users.id, id), eq(users.status, UserStatus.ACTIVE)));

		if (rows.length === 0) {
			return null;
		}

		return new User(
			rows[0].email,
			rows[0].passwordHash,
			rows[0].username,
			rows[0].role as UserRole,
			rows[0].id,
			rows[0].status as UserStatus,
			rows[0].createdAt,
			rows[0].updatedAt
		);
	}

	public async findByEmail(email: string): Promise<User | null> {
		const rows = await db
			.select()
			.from(users)
			.where(and(eq(users.email, email), eq(users.status, UserStatus.ACTIVE)));

		if (rows.length === 0) {
			return null;
		}

		return new User(
			rows[0].email,
			rows[0].passwordHash,
			rows[0].username,
			rows[0].role as UserRole,
			rows[0].id,
			rows[0].status as UserStatus,
			rows[0].createdAt,
			rows[0].updatedAt
		);
	}

	public async save(user: User): Promise<User> {
		await db.insert(users).values({
			email: user.getEmail(),
			passwordHash: user.getPasswordHash(),
			username: user.getUsername(),
			role: user.getRole(),
			status: user.getStatus()
		});
		return user;
	}

	public async update(user: User): Promise<void> {
		const primitives = {
			id: user.getId(),
			email: user.getEmail(),
			username: user.getUsername(),
			passwordHash: user.getPasswordHash(),
			role: user.getRole(),
			status: user.getStatus()
		};
		await db.update(users).set(primitives).where(eq(users.id, primitives.id));
	}
}

export const drizzleUserRepository = new DrizzleUserRepository();
