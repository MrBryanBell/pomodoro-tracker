<script lang="ts">
	export let primary = false;
	export let secondary = false;
</script>

<button class:primary class:secondary on:click>
	<slot>no text provided</slot>
</button>

<!-- 
    bg-color, color, hover-bg-color,
 -->
<style>
	button {
		padding: var(--size-6) 0;
		border-radius: 36px;
		width: 100%;
		border: none;

		font-family: var(--hubot-sans);
		font-size: var(--font-size-3);
		font-weight: var(--font-weight-6);
		line-height: 100%;
		letter-spacing: -0.03em;

		cursor: pointer;
	}

	.primary {
		background-color: var(--primary-1);
		color: var(--surface-1);
	}

	.secondary {
		background-color: var(--surface-3);
		color: var(--white-1);
	}
</style>
