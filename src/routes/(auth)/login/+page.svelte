<script lang="ts">
	import { loginWithEmailAndPassword } from '$lib/utils/auth/login';

	let email = '';
	let password = '';
</script>

<h1>Login Page</h1>
<input type="text" bind:value={email} />
<input type="password" bind:value={password} />
<button on:click={() => loginWithEmailAndPassword({ email, password })}>Login</button>
<a href="/">Go back to Welcome Page</a>

<p>Dont have an account?</p>
<a href="/register">Register</a>
