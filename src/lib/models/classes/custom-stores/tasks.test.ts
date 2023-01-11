import { get } from 'svelte/store';

import { categories } from '$store/categories';

import type { TaskProps } from '../task';
import { Task } from '../task';
import { Tasks } from './tasks';

let tasks: Tasks;
categories.add({ id: 'abc', name: 'Golang' });

beforeEach(() => {
	tasks = new Tasks();
});

it('should be a function ', () => {
	expect(typeof Tasks).toBe('function');
});

it('should create an instance', () => {
	expect(tasks).toBeInstanceOf(Tasks);
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
	const newTaskProps: TaskProps = {
		name: 'Crear una API Rest de libros',
		categoryId: 'abc'
	};

	tasks.add(newTaskProps);
	const allTasks = get(tasks.all$);
	expect(allTasks).toHaveLength(1);
	expect(allTasks[0]).toBeInstanceOf(Task);
});
