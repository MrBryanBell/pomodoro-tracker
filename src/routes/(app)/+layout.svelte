<script lang="ts">
	import { goto } from '$app/navigation';
	import { isUserLoggedIn } from '$store/session';
	import { initApp } from '$services/app/init-app';

	$: if (!$isUserLoggedIn) {
		goto('/login');
	} else {
		initApp();
		console.log('initApp()');
	}
</script>

<slot />
