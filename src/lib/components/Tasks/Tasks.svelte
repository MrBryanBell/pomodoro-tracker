<script lang="ts">
	import { tasks } from '$store/tasks';
	import { Task } from '$models/classes/task';

	let newTaskName = '';
	let categoryId = '';
	function addTask() {
		const newCategory = new Task({ name: newTaskName, categoryId });
		$tasks = [...$tasks, newCategory];
	}

	function deleteTask(id: string) {
		$tasks = $tasks.filter((task) => task.id !== id);
	}
</script>

<h1>Tareas</h1>
{#each $tasks as { id, name, category }}
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
<button on:click={addTask}>Agregar</button>

<style>
	div.task-wrapper {
		display: flex;
		gap: 4px;
	}
</style>
