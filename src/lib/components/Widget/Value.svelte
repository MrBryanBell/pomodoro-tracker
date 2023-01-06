<script lang="ts">
	type Unit = '' | 'hr' | 'po';
	export let unit: Unit = '';
	export let goal = '';
</script>

<section class="main-wrapper">
	<section class="data-wrapper">
		<slot />
		{#if goal}
			<span>/{goal}</span>
		{/if}
	</section>
	{#if unit}
		<span>{unit}.</span>
	{/if}
</section>

<style>
	.main-wrapper {
		display: flex;
		flex-direction: row;
		gap: 4px;
		align-items: center;

		font-family: 'Mona Sans';
		font-style: normal;
		font-weight: 700;
		font-size: 40px;
		line-height: 100%;
		letter-spacing: -0.02em;
		font-feature-settings: 'tnum' on, 'lnum' on;

		color: #ffffff;
	}

	.data-wrapper {
		display: flex;
		flex-direction: row;
		gap: 0;
	}

	.data-wrapper span {
		font-family: 'Mona Sans';
		font-style: normal;
		font-weight: 500;
		font-size: 40px;
		line-height: 100%;
		/* identical to box height, or 40px */

		letter-spacing: -0.03em;
		font-feature-settings: 'tnum' on, 'lnum' on;

		color: #707070;
	}

	section span {
		/* Emphasized/Medium */

		font-family: 'Hubot-Sans';
		font-style: normal;
		font-weight: 500;
		font-size: 24px;
		line-height: 100%;
		/* identical to box height, or 24px */

		letter-spacing: -0.03em;

		color: #cccccc;
	}
</style>
