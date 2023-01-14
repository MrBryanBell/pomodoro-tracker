import { derived, get, writable } from 'svelte/store';

import type { CreateWorkSessionProps } from '$models/work-session';

import { WorkSession } from '../work-session';

export class WorkSessionsStore {
	public readonly subscribe;
	private readonly update;
	private readonly set;

	constructor() {
		const { subscribe, update, set } = writable<WorkSession[]>([]);
		this.subscribe = subscribe;
		this.update = update;
		this.set = set;
	}

	// this could eventually be get all({ fromToday: true }})
	get all$() {
		return derived(this, (workSessions) => workSessions);
	}

	get allFromToday$() {
		return derived(this, (workSessions) => workSessions);
	}

	get totalTimeFromTodayInHours$() {
		return derived(this, (workSessions) => {
			const timeInMinutes = workSessions.reduce((acc, session) => {
				return acc + session.durationInMinutes;
			}, 0);

			const timeInHours = timeInMinutes / 60;

			return Math.floor(timeInHours * 10) / 10;
		});
	}

	get totalTimeFromLast7Days$() {
		return derived(this, (workSessions) => {
			const timeInMinutes = workSessions.reduce((acc, session) => {
				return acc + session.durationInMinutes;
			}, 0);

			const timeInHours = timeInMinutes / 60;

			return Math.floor(timeInHours * 10) / 10;
		});
	}

	add(workSessionObject: CreateWorkSessionProps) {
		const newWorkSession = new WorkSession(workSessionObject);
		this.update((sessions) => [...sessions, newWorkSession]);

		return newWorkSession;
	}

	findById(id: string) {
		const session = get(this).find((session) => session.id === id);

		return session;
	}

	delete(id: string) {
		const session = this.findById(id);
		if (!session) {
			throw new Error(`Session with id ${id} not found`);
		}

		this.update((sessions) => sessions.filter((session) => session.id !== id));
	}
}
