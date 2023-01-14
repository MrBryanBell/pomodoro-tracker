/* eslint-disable camelcase */
import { Category } from '$classes/category';
import type { TaskFromSupabase } from '$lib/models/task';
// import { categoriesStore } from '$store/categories';

export class Task {
	public readonly id: string;
	public name: string;
	public readonly createdAt: string;
	public updatedAt: string;
	public category: Category;

	constructor({ id, name, category, created_at, updated_at }: TaskFromSupabase) {
		this.id = id;
		this.name = name;
		this.createdAt = created_at;
		this.updatedAt = updated_at;
		this.category = new Category(category);
	}
}
