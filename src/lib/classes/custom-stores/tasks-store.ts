// IMPORTANT:
// This store is not an array of tasks, is an object with two properties:
// 1. The current Task (current)
// 2. All tasks.

import { derived, get, writable } from 'svelte/store';

import { Task } from '$classes/task';
import type { TaskFromSupabase } from '$models/task';
import { TasksHTTPService } from '$services/supabase/tasks';

// TODO: add optional property: defaultTask
// in case there is no current task, but user wants to start a new work session
interface TasksStoreConfig {
	current: Task | null;
	all: Task[];
}

export class TasksStore {
	public subscribe;
	private readonly update;
	private readonly set;

	// TODO: delete current task from here: move it to timer-custom-store
	constructor() {
		const init: TasksStoreConfig = {
			current: null,
			all: []
		};
		const { subscribe, update, set } = writable<TasksStoreConfig>(init);
		this.subscribe = subscribe;
		this.update = update;
		this.set = set;
	}

	async init() {
		const { data, error, status } = await TasksHTTPService.getAll();

		if (data === null) {
			console.error(status);
			throw new Error(error?.message);
		}

		const tasks = data.map((task) => new Task(task));
		const taskStoreConfig: TasksStoreConfig = {
			current: null,
			all: tasks
		};
		this.set(taskStoreConfig);
	}

	get all$() {
		return derived(this, (tasks) => tasks.all);
	}

	get current() {
		const currentTask = get(this).current;
		if (!currentTask) {
			throw new Error('No current task');
		}

		return currentTask;
	}

	add(task: TaskFromSupabase) {
		const newTask = new Task(task);
		this.update((tasks) => {
			tasks.all.push(newTask);

			return tasks;
		});

		return newTask;
	}

	delete(id: string) {
		this.update((tasks) => {
			tasks.all = tasks.all.filter((task) => task.id !== id);

			return tasks;
		});
	}

	setCurrentByName(taskName: string) {
		const task = this.findByName(taskName);
		this.update((tasks) => {
			tasks.current = task;

			return tasks;
		});
	}

	private findById(taskId: string) {
		const result = get(this).all.find((task) => task.id === taskId);
		if (!result) {
			throw new Error('Category not found');
		}

		return result;
	}

	private findByName(taskName: string) {
		const result = get(this).all.find((task) => task.name === taskName);
		if (!result) {
			throw new Error('Category not found');
		}

		return result;
	}
}
