import { get } from 'svelte/store';

import { type WorkSessionObject, WorkSession } from '../work-session';
import { WorkSessions } from './work-sessions';

let workSessions: WorkSessions;
let workSessionProps: WorkSessionObject;

beforeEach(() => {
	workSessions = new WorkSessions();
	workSessionProps = {
		durationInMinutes: 20,
		startTimeInISO: '2023-01-05T03:42:46.458-06:00',
		endTimeInISO: '2023-01-05T03:22:32.324-06:00'
	};
});

it('should be a function ', () => {
	expect(typeof WorkSessions).toBe('function');
});

it('should create an instance', () => {
	expect(workSessions).toBeInstanceOf(WorkSessions);
	expect(workSessions).toBeDefined();
	expect(typeof workSessions).toBe('object');
});

// .sessions$
it('should return an array', () => {
	const sessions = get(workSessions.sessions$);
	expect(Array.isArray(sessions)).toBe(true);
});

// add()
it('should return add a new work-session', () => {
	// workSessionProps is defined in beforeEach()
	workSessions.add(workSessionProps);

	const sessions = get(workSessions.sessions$);
	expect(sessions.length).toEqual(1);
	expect(sessions[0]).toBeInstanceOf(WorkSession);
});

// add test: it should return a new work-session when add() is called

// findById()
it('should return selected session', () => {
	// workSessionProps is defined in beforeEach()
	const newWorkSession = workSessions.add(workSessionProps);

	const session = workSessions.findById(newWorkSession.id);
	expect(session).toBeDefined();
	expect(session).toBeInstanceOf(WorkSession);
});

// delete()
it('should delete the session', () => {
	// workSessionProps is defined in beforeEach()
	const { id } = workSessions.add(workSessionProps);
	expect(get(workSessions.sessions$).length).toBe(1);
	workSessions.delete(id);
	expect(get(workSessions.sessions$).length).toBe(0);
});

// it('should return an array', () => {});
// it('should return an array', () => {});
// it('should return an array', () => {});
