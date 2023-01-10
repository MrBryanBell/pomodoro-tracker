<script lang="ts">
	import { categories } from '$store/categories';
	import { Category } from '$models/classes/category';

	let newCategoryName = '';
	function addCategory() {
		const newCategory = new Category({ name: newCategoryName });
		$categories = [...$categories, newCategory];
	}
</script>

<h1>Categorías</h1>
{#each $categories as { id, name }}
	<div class="category-wrapper">
		<p>{id}, {name}</p>
	</div>
{/each}

<h3>Agregar una nueva categoría</h3>
<input type="text" bind:value={newCategoryName} />
<button on:click={addCategory}>Agregar</button>

<style>
	div.category-wrapper {
		display: flex;
		gap: 4px;
	}
</style>
