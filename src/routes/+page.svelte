<script lang="ts">
	import { isUserLoggedIn } from '$store/session';
</script>

<h1>Welcome to Pomodoro Tracker</h1>
<p>A completely reimagined experience. Lets start</p>
<a href="/cities">Cities</a>

{#if $isUserLoggedIn}
	<a href="/home">Go to Home Page</a>
{:else}
	<a href="/login">Go to login Page</a>
	<a href="/register">Go to Register Page</a>
{/if}
