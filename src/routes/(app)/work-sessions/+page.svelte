<script lang="ts">
	import { workSessionsStore as workSessions } from '$store/work-sessions';

	const sessions = workSessions.all$;
</script>

<a href="/home">Go back to Home</a>

{#each $sessions as { id, startedTimeInISO, endTimeInISO, durationInMinutes, task, category }}
	<div>
		<p>{id}</p>
		<p>{startedTimeInISO}</p>
		<p>{endTimeInISO}</p>
		<p>{durationInMinutes}</p>
		<p>{task.name} // {category.name}</p>
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
