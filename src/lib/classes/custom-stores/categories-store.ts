/* eslint-disable @typescript-eslint/unbound-method */
import { type Subscriber, derived, get, writable } from 'svelte/store';

import { CategoriesService } from '$lib/services/supabase/categories';
import type { CategoryObject } from '$models/category';

import { Category } from '../category';

export class CategoriesStore {
	public subscribe;
	private readonly update;
	private readonly set;

	constructor() {
		const { subscribe, update, set } = writable<Category[]>([], this.start);
		this.subscribe = subscribe;
		this.update = update;
		this.set = set;
	}

	start(set: Subscriber<Category[]>) {
		CategoriesService.getAll()
			.then((categories) => {
				const c = categories.map((category) => new Category(category));
				set(c);
			})
			.catch((error) => console.error(error));

		return function stop() {
			console.log('Todos Store Stopped');
		};
	}

	get all$() {
		return derived(this, (categories) => categories);
	}

	// TODO: This could be typed from supabase types
	add(category: CategoryObject) {
		const newCategory = new Category(category);
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
