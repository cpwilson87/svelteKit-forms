import { z } from 'zod';

export const Schema = z
	.object({
		email: z
			.string({ required_error: 'Email is required' })
			.min(1, { message: 'Email is required' })
			.max(64, { message: 'Email must be less than 64 characters' })
			.email({ message: 'Email must be a valid email address' }),
		password: z
			.string({ required_error: 'Password Required' })
			.min(6, { message: 'Password must be at least 6 characters' }),
		confirmPassword: z
			.string({ required_error: 'Password Required' })
			.min(6, { message: 'Password must be at least 6 characters' })
	})
	.superRefine(({ password, confirmPassword }, ctx) => {
		if (password !== confirmPassword) {
			ctx.addIssue({
				code: 'custom',
				message: 'Password and Confirm Password must muatch',
				path: ['password']
			});
			ctx.addIssue({
				code: 'custom',
				message: 'Password and Confirm Password must muatch',
				path: ['confirmPassword']
			});
		}
	});

export type User = z.infer<typeof Schema>;
