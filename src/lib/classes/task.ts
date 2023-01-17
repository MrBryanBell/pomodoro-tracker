import type { TaskFromSupabase } from '$lib/models/task';
import type { ICategory } from '$models/category';

export class Task {
	public readonly id: string;
	public name: string;
	public readonly createdAt: string;
	public updatedAt: string;
	public category: Pick<ICategory, 'id' | 'name'>;

	constructor({ id, name, categoryId, createdAt, updatedAt }: TaskFromSupabase) {
		this.id = id;
		this.name = name;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.category = categoryId;
	}
}
