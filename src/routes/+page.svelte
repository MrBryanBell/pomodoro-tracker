<script lang="ts">
	import { timer } from '$lib/stores/timer';

	const timeLeftInMinutes = timer.timeLeftInMinutes$;
</script>

<h1>{$timeLeftInMinutes}</h1>
<button on:click={() => timer.start()}>start</button>
<button on:click={() => timer.pause()}>pause</button>
<button on:click={() => timer.restart()}>restart</button>
