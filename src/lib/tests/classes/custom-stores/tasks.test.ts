import { get } from 'svelte/store';

import { TasksStore } from '$classes/custom-stores/tasks-store';
import { Task } from '$classes/task';
import type { TaskFromSupabase } from '$models/task';

let tasks: TasksStore;
beforeEach(() => {
	tasks = new TasksStore();
});

it('should be a function ', () => {
	expect(typeof TasksStore).toBe('function');
});

it('should create an instance', () => {
	expect(tasks).toBeInstanceOf(TasksStore);
});

it('should have subscribe method', () => {
	const { subscribe } = tasks;
	expect(typeof subscribe).toBe('function');
});

it('should return all tasks', () => {
	const allTasks = get(tasks.all$);
	expect(allTasks).toEqual([]);
});

it('should add a task', () => {
	const newTaskProps: TaskFromSupabase = {
		categoryId: {
			id: '1',
			name: 'Test Category'
		},
		name: 'Test Task',
		id: '1',
		createdAt: '2023-01-05T03:42:46.458-06:00',
		updatedAt: '2023-01-05T03:42:46.458-06:00',
		userId: '1'
	};

	tasks.add(newTaskProps);
	const allTasks = get(tasks.all$);
	expect(allTasks).toHaveLength(1);
	expect(allTasks[0]).toBeInstanceOf(Task);
});
