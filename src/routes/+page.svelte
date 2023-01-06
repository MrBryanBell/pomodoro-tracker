<script lang="ts">
	import Timer from '$components/Timer/Timer.svelte';
	import Widget from '$components/Widget/Widget.svelte';
	import Value from '$lib/components/Widget/Value.svelte';
	import { workSessions } from '$lib/store/work-sessions';

	const allWorkSessionsToday = workSessions.allFromToday$;
</script>

<main>
	<Timer />
	<section>
		<Widget name="Tiempo total" annotation="hoy">
			<Value unit="hr">{$allWorkSessionsToday.length}</Value>
		</Widget>
	</section>
</main>

<a href="/settings">settings</a>
<a href="/work-sessions">work sessions</a>
<a href="/new">new components</a>

<style>
	main {
		display: grid;
		place-content: center;
		gap: 64px;
		height: 100vh;

		grid-template-columns: 290px auto;
	}
</style>
