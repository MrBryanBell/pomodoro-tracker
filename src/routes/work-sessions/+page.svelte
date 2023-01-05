<script lang="ts">
	import { workSessions } from '$store/work-sessions';

	const sessions = workSessions.sessions$;
</script>

<a href="/">Go back to Home</a>

{#each $sessions as session}
	<p>{session.id}</p>
	<p>{session.startTimeInISO}</p>
	<p>{session.endTimeInISO}</p>
	<p>{session.durationInMinutes}</p>
{:else}
	<p>you don't have any sessions for now</p>
{/each}
