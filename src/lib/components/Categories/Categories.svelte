<script lang="ts">
	import { createCategory, deleteCategory } from '$services/memory/categories';
	import { categoriesStore as categories } from '$store/categories';

	let newCategoryName = '';
</script>

<h1>Categorías</h1>
{#each $categories as { id, name }}
	<div class="category-wrapper">
		<p>{id}, {name}</p>
		<button on:click={() => deleteCategory(id)}>Delete</button>
	</div>
{/each}

<h3>Agregar una nueva categoría</h3>
<input type="text" bind:value={newCategoryName} />
<button on:click={() => createCategory(newCategoryName)}>Agregar</button>

<style>
	div.category-wrapper {
		display: flex;
		gap: 4px;
	}
</style>
