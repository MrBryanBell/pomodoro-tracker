import { DateTime } from 'luxon';

interface ICategory {
	id: number;
	name: string;
	createdAt: string;
	updatedAt: string;
}

export type CategoryObject = Pick<ICategory, 'name'>;

export class Category {
	public readonly id: string;
	public name: string;
	public readonly createdAt: string;
	public updatedAt: string;

	constructor({ name }: CategoryObject) {
		this.id = crypto.randomUUID();
		this.name = name;
		this.createdAt = DateTime.now().toISO();
		this.updatedAt = DateTime.now().toISO();
	}
}
