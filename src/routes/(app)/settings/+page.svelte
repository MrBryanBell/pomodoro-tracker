<script lang="ts">
	import { timerStore as timer } from '$store/timer';
	import Categories from '$components/Categories/Categories.svelte';
	import Tasks from '$components/Tasks/Tasks.svelte';

	let customTimeInMinutes = 25;
</script>

<h1>Settings</h1>
<input type="number" bind:value={customTimeInMinutes} />
<button on:click={() => timer.setDurationInMinutes(customTimeInMinutes)}>Aceptar </button>

<pre>{JSON.stringify($timer)}</pre>

<a href="/home">Home</a>
<Categories />
<Tasks />
