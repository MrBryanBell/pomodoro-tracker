<script lang="ts">
	import { goto } from '$app/navigation';
	// import { onMount } from 'svelte';
	import { isUserLoggedIn } from '$store/session';

	$: if (!$isUserLoggedIn) {
		goto('/login');
	}
	// onMount(() => {});
</script>

<slot />
