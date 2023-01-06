<script lang="ts">
	import Timer from '$components/Timer/Timer.svelte';
	import Widget from '$components/Widget/Widget.svelte';
	import Value from '$lib/components/Widget/Value.svelte';
	import { workSessions } from '$lib/store/work-sessions';

	const allWorkSessionsToday = workSessions.allFromToday$;
	const totalTimeInHours = workSessions.totalTimeFromTodayInHours$;
</script>

<main>
	<Timer />
	<section>
		<Widget name="Pomodoros" annotation="hoy" gridArea="pomodoros">
			<Value unit="po">{$allWorkSessionsToday.length}</Value>
		</Widget>
		<Widget name="Tiempo total" annotation="hoy" primary gridArea="tiempo">
			<Value unit="hr">{$totalTimeInHours}</Value>
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

	section {
		display: grid;
		grid-template-columns: repeat(3, 140px);
		grid-auto-rows: 144px;
		gap: 4px;

		grid-template-areas: 'pomodoros tiempo tiempo';
	}
</style>
