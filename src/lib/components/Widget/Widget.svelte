<script lang="ts">
	export let name = 'Pomodoros';
	export let annotation = 'hoy';
</script>

<div class="main-wrapper">
	<section class="widget-labels">
		<p class="widget-name">{name}</p>
		<span>*{annotation}</span>
	</section>

	<section>
		<slot />
	</section>
</div>

<style>
	.main-wrapper {
		width: 140px;
		height: 144px;

		background-color: var(--surface-2);
		border: 0.5px solid #292929;
		border-radius: 32px;
		padding: 1rem;

		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.widget-labels {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.widget-labels p {
		font-family: 'Hubot-Sans';
		font-style: normal;
		font-weight: 600;
		font-size: 16px;
		line-height: 100%;
		/* identical to box height, or 16px */

		letter-spacing: -0.025em;
		font-feature-settings: 'tnum' on, 'lnum' on;

		color: #fcfcfc;
	}

	.widget-labels span {
		font-family: 'Hubot-Sans';
		font-style: normal;
		font-weight: 400;
		font-size: 14px;
		line-height: 100%;
		/* identical to box height, or 14px */

		letter-spacing: -0.015em;

		color: #c2c2c2;
	}
</style>
