<script lang="ts">
	import { loginWithEmailAndPassword } from '$lib/utils/auth/login';

	let email = 'bryanbellabc@gmail.com';
	let password = 'Thacarter12';
</script>

<h1>Login Page</h1>
<input type="text" bind:value={email} />
<input type="password" bind:value={password} />
<button on:click={() => loginWithEmailAndPassword({ email, password })}>Login</button>
<a href="/">Home</a>

<p>Dont have an account?</p>
<a href="/register">Register</a>
