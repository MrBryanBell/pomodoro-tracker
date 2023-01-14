<script lang="ts">
	import { tasksStore as tasks } from '$store/tasks';
	import { createTask, deleteTask } from '$services/memory/tasks';

	let newTaskName = '';
	let categoryId = '';

	const allTasks = tasks.all$;
</script>

<h1>Tareas</h1>
{#each $allTasks as { id, name, category }}
	<div class="task-wrapper">
		<b>id: {id}, tarea: {name}</b>
		<p>categoría: {category.name}</p>
		<button on:click={() => deleteTask(id)}>Delete</button>
	</div>
{/each}

<h3>Agregar una nueva Tarea</h3>
<label for="">Nombre</label>
<input type="text" bind:value={newTaskName} placeholder="Configuración Eslint" />
<label for="">Categoría</label>
<input type="text" bind:value={categoryId} placeholder="Id de la categoría" />
<button on:click={() => createTask({ name: newTaskName, category: categoryId })}>Agregar</button>

<style>
	div.task-wrapper {
		display: flex;
		gap: 4px;
	}
</style>
