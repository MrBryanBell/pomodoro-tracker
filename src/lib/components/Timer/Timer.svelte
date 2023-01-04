<script lang="ts">
	import { timer } from '$store/timer';
	import { Button, CountDown, EndTime, Name } from './tokens';

	const timeLeftInMinutes = timer.timeLeftInMinutes$;
	const formattedEndTime = timer.formattedEndTime$;
	const isPaused = timer.isPaused$;
</script>

<div class="main-wrapper">
	<Name>tiempo restante</Name>

	<CountDown>{$timeLeftInMinutes}</CountDown>
	<EndTime>{$formattedEndTime}</EndTime>

	<section class="cta-wrapper">
		<Button secondary on:click={() => timer.restart()}>reiniciar</Button>
		{#if $isPaused}
			<Button primary on:click={() => timer.start()}>iniciar</Button>
		{:else}
			<Button primary on:click={() => timer.pause()}>pausar</Button>
		{/if}
	</section>
</div>

<style>
	.main-wrapper {
		padding: 16px;
		padding-bottom: 12px;
		min-width: 290px;
		background-color: var(--surface-2);
		border-radius: 52px;
	}

	section.cta-wrapper {
		display: flex;
		flex-direction: row;
		gap: var(--size-2);
	}
</style>
