<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let user: string;

	user = data?.user?.email ?? '';

	console.log({ data, user });
</script>

<h1>Sign Up Form</h1>

<form action="?/signUp" method="POST">
	<label for="email">Email</label>
	<input type="text" name="email" id="email" value={user} />

	<label for="password">Password</label>
	<input type="password" name="password" id="password" />

	<label for="confirmPassword">Confirm Password</label>
	<input type="password" name="confirmPassword" id="confirmPassword" />

	<button type="submit">Create Account</button>
</form>
