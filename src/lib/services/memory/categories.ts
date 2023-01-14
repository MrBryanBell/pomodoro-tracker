import { categoriesStore } from '$store/categories';

import { CategoriesService } from '../supabase/categories';

export async function createCategory(name: string) {
	const newCategory = await CategoriesService.create({ name });
	categoriesStore.add(newCategory);
}

export async function deleteCategory(id: string) {
	await CategoriesService.delete(id);
	categoriesStore.delete(id);
}
