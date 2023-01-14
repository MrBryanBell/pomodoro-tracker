import { DateTime } from 'luxon';

import type { CreateCategoryProps } from '$models/category';

export class Category {
	public readonly id: string;
	public name: string;
	public readonly createdAt: string;
	public updatedAt: string;

	constructor({ id, name }: CreateCategoryProps) {
		this.id = id ?? crypto.randomUUID();
		this.name = name;
		this.createdAt = DateTime.now().toISO();
		this.updatedAt = DateTime.now().toISO();
	}
}
