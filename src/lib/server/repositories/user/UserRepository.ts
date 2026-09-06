import type { User } from "$lib/server/models/User";

export interface UserRepository {
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	save(user: User): Promise<User>;
	update(user: User): Promise<void>;
}