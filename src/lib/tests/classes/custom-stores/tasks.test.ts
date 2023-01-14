import { get } from 'svelte/store';

import { TasksStore } from '$classes/custom-stores/tasks-store';
import { Task } from '$classes/task';
import type { CreateTaskProps } from '$models/task';
import { categoriesStore as categories } from '$store/categories';

let tasks: TasksStore;
categories.add({
	id: 'abc',
	name: 'Golang',
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString()
});

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
	const newTaskProps: CreateTaskProps = {
		name: 'Crear una API Rest de libros',
		categoryId: 'abc'
	};

	tasks.add(newTaskProps);
	const allTasks = get(tasks.all$);
	expect(allTasks).toHaveLength(1);
	expect(allTasks[0]).toBeInstanceOf(Task);
});
