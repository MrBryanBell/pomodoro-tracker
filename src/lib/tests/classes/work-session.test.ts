import { WorkSession } from '$classes/work-session';
import type { WorkSessionsFromSupabase } from '$models/work-session';

describe('WorkSession', () => {
	let workSession: WorkSession;

	beforeEach(() => {
		const workSessionConfig: WorkSessionsFromSupabase = {
			id: '1',
			startedTimeInISO: '2023-01-05T03:42:46.458-06:00',
			categoryId: {
				id: '1',
				name: 'Test Category'
			},
			taskId: {
				id: '1',
				name: 'Test Task'
			},
			durationInMinutes: 20,
			endTimeInISO: '2023-01-05T03:22:32.324-06:00',
			userId: '1',
			createdAt: '2023-01-05T03:42:46.458-06:00',
			updatedAt: '2023-01-05T03:42:46.458-06:00'
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
