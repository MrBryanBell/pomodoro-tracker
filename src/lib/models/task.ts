import type { Category } from '$classes/category';

interface TaskObject {
	id: number;
	name: string;
	createdAt: string;
	updatedAt: string;
	category: Category;
}

export interface CreateTaskProps extends Pick<TaskObject, 'name'> {
	categoryId: string;
}
