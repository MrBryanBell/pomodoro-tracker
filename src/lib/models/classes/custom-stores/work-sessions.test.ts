import { get } from 'svelte/store';

import { type WorkSessionObject, WorkSession } from '../work-session';
import { WorkSessions } from './work-sessions';

let workSessions: WorkSessions;

beforeEach(() => {
	workSessions = new WorkSessions();
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
	const workSessionProps: WorkSessionObject = {
		durationInMinutes: 20,
		endTimeInISO: '2023-01-05T03:22:32.324-06:00',
		startTimeInISO: '2023-01-05T03:42:46.458-06:00'
	};

	workSessions.add(workSessionProps);

	const sessions = get(workSessions.sessions$);
	expect(sessions.length).toEqual(1);
	expect(sessions[0]).toBeInstanceOf(WorkSession);
});

// it('should return an array', () => {});