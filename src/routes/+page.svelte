<script lang="ts">
	import Timer from '$components/Timer/Timer.svelte';
	import Widget from '$components/Widget/Widget.svelte';
	import Value from '$lib/components/Widget/Value.svelte';
	import { workSessions } from '$lib/store/work-sessions';

	const allWorkSessionsToday = workSessions.allFromToday$;
	const totalTimeFromToday = workSessions.totalTimeFromTodayInHours$;
	const totalTimeFromLast7Days = workSessions.totalTimeFromLast7Days$;
</script>

<main>
	<Timer />
	<section>
		<Widget name="Pomodoros" annotation="hoy" gridArea="pomodoros">
			<Value unit="po">{$allWorkSessionsToday.length}</Value>
		</Widget>
		<Widget name="Tiempo total" annotation="hoy" primary gridArea="tiempo">
			<Value unit="hr">{$totalTimeFromToday}</Value>
		</Widget>
		<Widget name="Últimos 7 días" annotation="19/12 - 26/12" primary gridArea="last-7-days">
			<Value unit="hr">{$totalTimeFromLast7Days}</Value>
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
		grid-template-rows: 144px 216px;
		column-gap: 4px;
		row-gap: 16px;

		grid-template-areas:
			'pomodoros tiempo tiempo'
			'last-7-days last-7-days last-7-days';
	}
</style>
