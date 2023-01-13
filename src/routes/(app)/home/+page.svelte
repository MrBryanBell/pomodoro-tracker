<script lang="ts">
	import Timer from '$components/Timer/Timer.svelte';
	import Widget from '$components/Widget/Widget.svelte';
	import Value from '$lib/components/Widget/Value.svelte';
	import { workSessions } from '$lib/store/work-sessions';
	import { tasks } from '$store/tasks';

	const allWorkSessionsToday = workSessions.allFromToday$;
	const totalTimeFromToday = workSessions.totalTimeFromTodayInHours$;
	const totalTimeFromLast7Days = workSessions.totalTimeFromLast7Days$;

	const allTasks = tasks.all$;

	function updateCurrentTask(e: InputEvent) {
		const taskName = (e.target as HTMLInputElement).value;
		tasks.setCurrentByName(taskName);
	}
</script>

<main>
	<Timer />

	<section class="main-widgets-wrapper">
		<Widget name="Pomodoros" annotation="hoy" gridArea="pomodoros">
			<Value unit="po">{$allWorkSessionsToday.length}</Value>
		</Widget>
		<Widget name="Tiempo total" annotation="hoy" primary gridArea="tiempo">
			<Value unit="hr">{$totalTimeFromToday}</Value>
		</Widget>
		<Widget name="Últimos 7 días" annotation="19/12 - 26/12" gridArea="last-7-days">
			<Value unit="hr">{$totalTimeFromLast7Days}</Value>
		</Widget>
		<Widget name="Meta diaria" annotation="pomodoros" gridArea="daily-goal">
			<Value unit="po" goal="22">{$allWorkSessionsToday.length}</Value>
		</Widget>
	</section>
</main>

<a href="/settings">settings</a>
<a href="/work-sessions">work sessions</a>

<a href="/register">register</a>
<a href="/login">login</a>
<a href="/logout">logout</a>

<input list="tasks" on:change={(e) => updateCurrentTask(e)} />
<datalist id="tasks">
	{#each $allTasks as { name }}
		<option value={name}>{name}</option>
	{/each}
</datalist>

<style>
	main {
		display: grid;
		place-content: center;
		gap: 64px;
		height: 100vh;

		grid-template-columns: 290px auto;
	}

	section.main-widgets-wrapper {
		display: grid;
		grid-template-columns: repeat(3, 140px) 210px;
		grid-template-rows: 144px 216px;
		gap: 16px;

		grid-template-areas:
			'pomodoros tiempo tiempo daily-goal'
			'last-7-days last-7-days last-7-days daily-goal';
	}
</style>
