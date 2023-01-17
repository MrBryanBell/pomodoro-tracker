import { get } from 'svelte/store';

import { Category } from '$classes/category';
import { CategoriesStore } from '$classes/custom-stores/categories-store';
import type { CategoryFromSupabase } from '$models/category';

let categories: CategoriesStore;

beforeEach(() => {
	categories = new CategoriesStore();
});

it('should be a function ', () => {
	expect(typeof CategoriesStore).toBe('function');
});

it('should create an instance', () => {
	expect(categories).toBeInstanceOf(CategoriesStore);
});

it('should have subscribe method', () => {
	const { subscribe } = categories;
	expect(typeof subscribe).toBe('function');
});

it('should return all categories', () => {
	const allTasks = get(categories.all$);
	expect(allTasks).toEqual([]);
});

describe('...', () => {
	const newCategoryProps: CategoryFromSupabase = {
		id: '1',
		createdAt: '2023-01-05T03:42:46.458-06:00',
		updatedAt: '2023-01-05T03:42:46.458-06:00',
		userId: '1',
		name: 'Crear configuración personalizada Eslint'
	};
	beforeEach(() => {
		categories = new CategoriesStore();
	});

	it('should add a category', () => {
		categories.add(newCategoryProps);
		const allCategories = get(categories.all$);

		expect(allCategories).toHaveLength(1);
		expect(allCategories[0]).toBeInstanceOf(Category);
	});

	it('should delete the specified category', () => {
		const { id } = categories.add(newCategoryProps);
		categories.delete(id);
		const allCategories = get(categories.all$);

		expect(allCategories).toHaveLength(0);
	});

	it('should return an object if it finds the categorie', () => {
		const { id } = categories.add(newCategoryProps);
		const result = categories.findById(id);

		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(Category);
	});
});
