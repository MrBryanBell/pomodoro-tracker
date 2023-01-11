import { DateTime } from 'luxon';

import { categories } from '$store/categories';

import type { Category } from './category';

interface ITask {
	id: number;
	name: string;
	createdAt: string;
	updatedAt: string;
	category: Category;
}

export interface TaskProps extends Pick<ITask, 'name'> {
	categoryId: string;
}

export class Task {
	public readonly id: string;
	public name: string;
	public readonly createdAt: string;
	public updatedAt: string;
	public category: Category;

	constructor({ name, categoryId }: TaskProps) {
		this.id = crypto.randomUUID();
		this.name = name;
		this.createdAt = DateTime.now().toISO();
		this.updatedAt = DateTime.now().toISO();
		this.category = categories.findById(categoryId);
	}
}
