<script lang="ts">
	import { workSessions } from '$store/work-sessions';

	const sessions = workSessions.all$;
</script>

<a href="/home">Go back to Home</a>

{#each $sessions as { id, startTimeInISO, endTimeInISO, durationInMinutes, task }}
	<div>
		<p>{id}</p>
		<p>{startTimeInISO}</p>
		<p>{endTimeInISO}</p>
		<p>{durationInMinutes}</p>
		<p>{task.name} // {task.category.name}</p>
		<button on:click={() => workSessions.delete(id)}>delete</button>
	</div>
{:else}
	<p>you don't have any sessions for now</p>
{/each}

<h2>Total pomodoros: {$sessions.length}</h2>

<style>
	div,
	p {
		border: 1px solid white;
	}

	div {
		display: flex;
	}
</style>
