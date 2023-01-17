/* eslint-disable @typescript-eslint/unbound-method */
import { derived, get, writable } from 'svelte/store';

import { CategoriesHTTPService } from '$lib/services/supabase/categories';
import type { CategoryFromSupabase } from '$models/category';

import { Category } from '../category';

export class CategoriesStore {
	public subscribe;
	private readonly update;
	private readonly set;

	constructor() {
		const { subscribe, update, set } = writable<Category[]>([]);
		this.subscribe = subscribe;
		this.update = update;
		this.set = set;
	}

	async init() {
		const { data, error, status } = await CategoriesHTTPService.getAll();
		if (data === null) {
			console.error(status);
			throw new Error(error?.message);
		}

		const categories = data.map((category) => new Category(category));
		this.set(categories);
	}

	get all$() {
		return derived(this, (categories) => categories);
	}

	add(category: CategoryFromSupabase) {
		const newCategory = new Category(category);
		this.update((categories) => [...categories, newCategory]);

		return newCategory;
	}

	delete(id: string) {
		this.update((categories) => {
			return categories.filter((category) => category.id !== id);
		});
	}

	findById(id: string) {
		const result = get(this).find((category) => category.id === id);
		if (!result) {
			throw new Error('Category not found');
		}

		return result;
	}
}
