<script lang="ts">
	import { timer } from '$store/timer';

	let customTimeInMinutes = 25;
</script>

<h1>Settings</h1>
<input type="number" bind:value={customTimeInMinutes} />
<button on:click={() => timer.setDurationInMinutes(customTimeInMinutes)}>Aceptar </button>

<pre>{JSON.stringify($timer)}</pre>

<a href="/">Home</a>
