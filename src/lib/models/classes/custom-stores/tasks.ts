import { derived, get, writable } from 'svelte/store';

import { type TaskProps, Task } from '../task';

interface TasksStoreConfig {
	current: Task | null;
	all: Task[];
}

export class Tasks {
	public subscribe;
	private readonly update;
	private readonly set;

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

	get all$() {
		return derived(this, (tasks) => tasks.all);
	}

	add(task: TaskProps) {
		const newTask = new Task(task);
		this.update((tasks) => {
			tasks.all.push(newTask);

			return tasks;
		});

		return newTask;
	}

	delete(taskId: string) {
		this.update((tasks) => {
			tasks.all = tasks.all.filter((task) => task.id !== taskId);

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
