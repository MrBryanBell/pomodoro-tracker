<script lang="ts">
	import { registerUser } from '$lib/utils/auth/register';

	let email = 'bryanbellabc@gmail.com';
	let password = 'Thacarter12';
</script>

<h1>Register New User</h1>
<input type="text" bind:value={email} />
<input type="password" bind:value={password} />
<button on:click={() => registerUser({ email, password })}>Register</button>
