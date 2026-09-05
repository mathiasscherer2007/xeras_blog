import * as z from 'zod';

export const userSignupSchema = z
	.object({
		username: z.string().min(3, "Username too short").max(50, "Username too long").nonoptional("Username is missing"),
		email: z.email().min(1, "Email is missing").nonoptional(),
		password: z.string().min(3, "Password too short").nonoptional(),
		passwordConfirm: z.string().min(3, "Password too short").nonoptional()
	})
	.refine((user) => user.password === user.passwordConfirm, { error: "Password and Confim Password don't match" });
