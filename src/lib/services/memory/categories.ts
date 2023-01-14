import { categoriesStore } from '$store/categories';

import { CategoriesService } from '../supabase/categories';

export async function createCategory(name: string) {
	const newCategory = await CategoriesService.create({ name });
	categoriesStore.add(newCategory);
}
