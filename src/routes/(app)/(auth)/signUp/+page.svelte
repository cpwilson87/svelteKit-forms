<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;

	let user: String = data?.user?.email ?? '';
	let password: String = data?.user?.password ?? '';
	let confirmPassword: String = data?.user?.confirmPassword ?? '';

	// console.log({ user });
</script>

<h1>Sign Up Form</h1>

<form action="?/signUp" method="POST" use:enhance>
	<label for="email">Email</label>
	<input type="text" name="email" id="email" value={user} />

	<label for="password">Password</label>
	<input type="password" name="password" id="password" value={password} />

	<label for="confirmPassword">Confirm Password</label>
	<input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} />

	<button type="submit">Create Account</button>
</form>
