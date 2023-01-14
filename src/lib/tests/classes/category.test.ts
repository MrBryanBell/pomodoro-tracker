import { Category } from '$classes/category';
import type { CategoryObject } from '$models/category';

let category: Category;
beforeEach(() => {
	const categoryConfig: CategoryObject = {
		id: '1',
		name: 'Render 3D',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	};
	category = new Category(categoryConfig);
});

it('should create be a function', () => {
	expect(typeof Category).toBe('function');
});

it('should create an instance', () => {
	expect(category).toBeInstanceOf(Category);
});

it('should have an id by default', () => {
	const { id } = category;
	expect(id).toBeDefined();
	expect(typeof id).toBe('string');
});

it('should name, createdAt, updatedAt properties ', () => {
	const { name, createdAt, updatedAt } = category;
	expect(name).toBeDefined();
	expect(createdAt).toBeDefined();
	expect(updatedAt).toBeDefined();
});

// it('should ', () => {});
// it('should ', () => {});
// it('should ', () => {});
