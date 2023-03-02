import type { Actions, PageServerLoad } from './$types';
import { formValidator } from '$lib/utils';
import { type User, Schema } from './types';

// Loader
export const load: PageServerLoad = () => {
	const user: User = {
		email: 'test@test.com',
		password: '123456',
		confirmPassword: '1234567'
	};

	return { ...user };
};

// Actions
export const actions: Actions = {
	signUp: async (event) => {
		const { data, errors } = await formValidator(event, Schema);

		if (errors) {
			const fieldErrors = errors?.fieldErrors;
			const formErrors = errors?.formErrors;
			console.log({ data, fieldErrors, formErrors });
			return { data, fieldErrors, formErrors };
		}

		// Running action
		console.log({ data });
		return;
	}
};
