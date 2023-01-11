import { categories } from '$store/categories';

import { Category } from './category';
import { Task } from './task';
import { type WorkSessionObject, WorkSession } from './work-session';

describe('WorkSession', () => {
	let workSession: WorkSession;

	beforeEach(() => {
		const newCategory = new Category({ name: 'Test Category', id: '1' });
		categories.add(newCategory);
		const newTask = new Task({ name: 'Test Task', categoryId: '1' });
		const workSessionConfig: WorkSessionObject = {
			durationInMinutes: 20,
			endTimeInISO: '2023-01-05T03:22:32.324-06:00',
			startTimeInISO: '2023-01-05T03:42:46.458-06:00',
			task: newTask
		};
		workSession = new WorkSession(workSessionConfig);
	});

	it('should be mocked', () => {
		expect(typeof crypto.randomUUID()).toBe('string');
	});

	it('should be a function', () => {
		expect(typeof WorkSession).toBe('function');
	});

	it('should create an instance', () => {
		expect(workSession).toBeInstanceOf(WorkSession);
	});

	it('should create id by default', () => {
		expect(workSession.id).toBeDefined();
	});

	it('should have an string as id', () => {
		expect(typeof workSession.id).toBe('string');
	});

	it('should have task property', () => {
		expect(typeof workSession.id).toBe('string');
	});

	// it('should ', () => {});
	// it('should ', () => {});
});
