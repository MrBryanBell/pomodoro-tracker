import { DateTime } from 'luxon';

interface ICategory {
	id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
}

export type CategoryProps = Pick<ICategory, 'name'> & Partial<Pick<ICategory, 'id'>>;

export class Category {
	public readonly id: string;
	public name: string;
	public readonly createdAt: string;
	public updatedAt: string;

	constructor({ id, name }: CategoryProps) {
		this.id = id ?? crypto.randomUUID();
		this.name = name;
		this.createdAt = DateTime.now().toISO();
		this.updatedAt = DateTime.now().toISO();
	}
}
