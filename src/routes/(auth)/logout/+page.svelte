<script lang="ts">
	import { logout } from '$lib/utils/auth/logout';
</script>

<h1>Logout Page</h1>
<button on:click={() => logout()}>Logout</button>
