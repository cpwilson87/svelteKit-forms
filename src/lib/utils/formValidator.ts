import type { RequestEvent } from '@sveltejs/kit';
import type { Schema, typeToFlattenedError } from 'zod';

const formValidator = async <TValues>(event: RequestEvent, schema: Schema<TValues>) => {
	const formData = Object.fromEntries(await event.request.formData());
	const validation = schema.safeParse(formData);

	let errors: typeToFlattenedError<Schema> | undefined;

	if (!validation.success) {
		errors = validation.error.flatten();
		return { formData, errors };
	}
	return { formData, errors };
};

export { formValidator };
