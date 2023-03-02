import type { Actions, PageServerLoad } from './$types';

// Loader
export const load: PageServerLoad = () => {
	const user = {
		email: 'test@test.com'
	};

	return { user };
};

// Actions
export const actions: Actions = {
	signUp: async (event) => {
		console.log({ event });
		return;
	}
};
