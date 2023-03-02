import type { Actions, PageServerLoad } from './$types';
import { formValidator } from '$lib/utils';
import { z } from 'zod';

const SignInSchema = z
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

// Type
type User = z.infer<typeof SignInSchema>;

// Loader
export const load: PageServerLoad = () => {
	const user: User = {
		email: 'test@test.com',
		password: '123456',
		confirmPassword: '123456'
	};

	return { user };
};

// Actions
export const actions: Actions = {
	signUp: async (event) => {
		const { formData, errors } = await formValidator(event, SignInSchema);

		if (errors) {
			const fieldErrors = errors?.fieldErrors;
			const formErrors = errors?.formErrors;
			console.log({ fieldErrors, formErrors });
			return;
			// Return Data Back to the form
		}

		// Running action
		console.log({ formData });
		return;
	}
};
