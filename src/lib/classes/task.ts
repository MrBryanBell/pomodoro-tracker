import { DateTime } from 'luxon';

import type { Category } from '$classes/category';
import type { CreateTaskProps } from '$lib/models/task';
import { categoriesStore } from '$store/categories';

export class Task {
	public readonly id: string;
	public name: string;
	public readonly createdAt: string;
	public updatedAt: string;
	public category: Category;

	constructor({ name, categoryId }: CreateTaskProps) {
		this.id = crypto.randomUUID();
		this.name = name;
		this.createdAt = DateTime.now().toISO();
		this.updatedAt = DateTime.now().toISO();
		this.category = categoriesStore.findById(categoryId);
	}
}
