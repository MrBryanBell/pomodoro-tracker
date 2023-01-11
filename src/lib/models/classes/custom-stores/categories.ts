import { derived, get, writable } from 'svelte/store';

import { type CategoryProps, Category } from '../category';

export class Categories {
	public subscribe;
	private readonly update;
	private readonly set;

	constructor() {
		const { subscribe, update, set } = writable<Category[]>([]);
		this.subscribe = subscribe;
		this.update = update;
		this.set = set;
	}

	get all$() {
		return derived(this, (categories) => categories);
	}

	add(categoryProps: CategoryProps) {
		const newCategory = new Category(categoryProps);
		this.update((categories) => {
			return [...categories, newCategory];
		});

		return newCategory;
	}

	delete(categoryId: string) {
		this.update((categories) => {
			return categories.filter((category) => category.id !== categoryId);
		});
	}

	findById(categoryId: string) {
		const result = get(this).find((category) => category.id === categoryId);
		if (!result) {
			throw new Error('Category not found');
		}

		return result;
	}
}
