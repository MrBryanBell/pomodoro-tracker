// Important:
// This store is not an array of tasks, but an object with two properties:
// The current Task (current) and all other tasks (all).

/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable camelcase */
import { type Subscriber, derived, get, writable } from 'svelte/store';

import { Task } from '$classes/task';
import type { TaskFromSupabase } from '$models/task';
import { TasksService } from '$services/supabase/tasks';

interface TasksStoreConfig {
	current: Task | null;
	all: Task[];
}

export class TasksStore {
	public subscribe;
	private readonly update;
	private readonly set;

	constructor() {
		const init: TasksStoreConfig = {
			current: null,
			all: []
		};
		const { subscribe, update, set } = writable<TasksStoreConfig>(init, this.start);
		this.subscribe = subscribe;
		this.update = update;
		this.set = set;
	}

	start(set: Subscriber<TasksStoreConfig>) {
		TasksService.getAll()
			.then((tasks) => {
				// this should be replaced with parseTasksFromSupabase()
				// but it's not working for some reason (unknown)
				// it-should-be: const t = this.parseTasksFromSupabase(tasks);
				const t = tasks.map(
					({ id, name, category, created_at, updated_at }) =>
						new Task({ id, name, category, created_at, updated_at })
				);
				const taskStoreConfig: TasksStoreConfig = {
					current: null,
					all: t
				};
				set(taskStoreConfig);
			})
			.catch((error) => console.error(error));
	}

	get all$() {
		return derived(this, (tasks) => tasks.all);
	}

	add(task: TaskFromSupabase) {
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

	parseTasksFromSupabase(tasks: TaskFromSupabase[]) {
		const parsedTasks = tasks.map(
			({ id, name, category, created_at, updated_at }) =>
				new Task({ id, name, category, created_at, updated_at })
		);
		console.log(parsedTasks);

		return parsedTasks;
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
