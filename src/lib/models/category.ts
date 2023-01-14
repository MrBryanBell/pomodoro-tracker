export interface CategoryObject {
	id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
}

export type CreateCategoryProps = Pick<CategoryObject, 'name'> &
	Partial<Pick<CategoryObject, 'id'>>;
