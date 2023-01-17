import type { CreateCategoryProps } from '$models/category';
import { categoriesStore } from '$store/categories';

import { CategoriesHTTPService } from '../supabase/categories';

export async function createCategory(categoryProps: CreateCategoryProps) {
	const { data: createdCategory, error } = await CategoriesHTTPService.create(categoryProps);

	if (!createdCategory) {
		console.error(error);
		throw new Error('Could not create category');
	}
	categoriesStore.add(createdCategory);
}

export async function deleteCategory(id: string) {
	const { status } = await CategoriesHTTPService.delete(id);
	if (status !== 200) {
		throw new Error('Could not delete task');
	}
	categoriesStore.delete(id);
}
