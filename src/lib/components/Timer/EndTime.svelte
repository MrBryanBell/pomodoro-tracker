<script lang="ts">
	import AlertOn from '$icons/AlertOn.svelte';
</script>

<section>
	<span>
		<AlertOn />
		<slot />
	</span>
</section>

<style>
	section {
		display: flex;
		justify-content: center;
	}
	span {
		margin-bottom: var(--size-8);
		text-align: center;
		background-color: var(--surface-1);
		padding: var(--size-3) var(--size-4);
		border-radius: 100px;
		/* padding: 8px 12px; */

		display: flex;
		align-items: center;
		gap: var(--size-2);
		color: var(--white-2);

		font-family: var(--hubot-sans);
		font-size: var(--font-size-1);
		font-weight: var(--font-weight-5);
		letter-spacing: -0.01em;
		font-feature-settings: 'tnum' on, 'lnum' on;
		line-height: 1rem;
	}
</style>
