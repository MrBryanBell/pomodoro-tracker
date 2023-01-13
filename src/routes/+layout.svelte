<script lang="ts">
	import '../globals.css';
	import { isUserLoggedIn } from '$store/session';
</script>

{#if $isUserLoggedIn === null}
	<div>Loading...</div>
{:else}
	<slot />
{/if}
