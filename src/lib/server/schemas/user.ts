import * as z from 'zod';

export const userSignupSchema = z
	.object({
		username: z.string().min(3, 'Username too short').max(50, 'Username too long').nonoptional(),
		email: z.email().nonempty('Email is missing').nonoptional(),
		password: z.string().min(3, 'Password too short').nonoptional(),
		passwordConfirm: z.string().min(3, 'Password too short').nonoptional()
	})
	.refine((user) => user.password === user.passwordConfirm, {
		error: "Password and Confirm Password don't match"
	});

export type userSignupSchema = z.infer<typeof userSignupSchema>;


export const userLoginSchema = z
	.object({
		email: z.email().nonempty('Email is missing').nonoptional(),
		password: z.string().nonempty('Password is missing').nonoptional()
	});

export type userLoginSchema = z.infer<typeof userLoginSchema>;