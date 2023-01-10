import { DateTime } from 'luxon';
import { get } from 'svelte/store';

import { categories } from '$store/categories';

import type { Category } from './category';

interface ITask {
	id: number;
	name: string;
	createdAt: string;
	updatedAt: string;
	categoryId: string;
}

export type TaskObject = Pick<ITask, 'name' | 'categoryId'>;

export class Task {
	public readonly id: string;
	public name: string;
	public readonly createdAt: string;
	public updatedAt: string;
	public category: Category;

	constructor({ name, categoryId }: TaskObject) {
		this.id = crypto.randomUUID();
		this.name = name;
		this.createdAt = DateTime.now().toISO();
		this.updatedAt = DateTime.now().toISO();
		this.category = get(categories).find((category) => category.id === categoryId);
	}
}
