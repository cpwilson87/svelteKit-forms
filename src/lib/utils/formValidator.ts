import type { RequestEvent } from '@sveltejs/kit';
import type { Schema, typeToFlattenedError } from 'zod';

export const formValidator = async <TValues>(event: RequestEvent, schema: Schema<TValues>) => {
	const data = Object.fromEntries(await event.request.formData());
	const validation = schema.safeParse(data);

	let errors: typeToFlattenedError<Schema> | undefined;

	if (!validation.success) {
		errors = validation.error.flatten();
		// return { data, errors };
	}

	return { data, errors };
};

// function formBody()
