import type { Actions, PageServerLoad, RequestEvent } from './$types';
import { z } from 'zod';

const signUpSchema = z
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
type User = {
	email: string;
	password: string;
	confirmPassword: string;
};

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
		const { formData, errors } = await getFormData(event);

		if (errors) {
			const fieldErrors = errors?.fieldErrors;
			const formErrors = errors?.formErrors;
			console.log({ fieldErrors, formErrors });
			return;
		}
		console.log({ formData });
		return;
	}
};

// Validation
async function getFormData(event: RequestEvent) {
	const formData = Object.fromEntries(await event.request.formData());
	const validation = signUpSchema.safeParse(formData);

	let errors: z.typeToFlattenedError<User> | undefined;

	if (!validation.success) {
		errors = validation.error.flatten();
		return { formData, errors };
	}
	return { formData, errors };
}

// NEXT STEP: Pass zod schema to getFormData
