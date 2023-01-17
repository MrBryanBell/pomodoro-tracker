import type { CategoryFromSupabase } from '$models/category';

export class Category {
	public readonly id: string;
	public name: string;
	public readonly createdAt: string;
	public updatedAt: string;

	constructor({ id, name, createdAt, updatedAt }: CategoryFromSupabase) {
		this.id = id;
		this.name = name;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}
