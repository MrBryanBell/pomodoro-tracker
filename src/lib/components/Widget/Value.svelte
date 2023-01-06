<script lang="ts">
	export let unit = 'po';
</script>

<section>
	<slot />
	<span>{unit}.</span>
</section>

<style>
	section {
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
