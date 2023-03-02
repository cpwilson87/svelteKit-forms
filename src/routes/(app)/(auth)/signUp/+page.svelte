<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h1>Sign Up Form</h1>

<form action="?/signUp" method="POST" use:enhance>
	<label for="email">Email</label>
	<input type="text" name="email" id="email" value={data.email} />

	<label for="password">Password</label>
	<input type="password" name="password" id="password" value={data.password} />

	<label for="confirmPassword">Confirm Password</label>
	<input type="password" name="confirmPassword" id="confirmPassword" value={data.confirmPassword} />

	<button type="submit">Create Account</button>
</form>
