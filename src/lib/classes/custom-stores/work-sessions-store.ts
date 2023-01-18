import { DateTime } from 'luxon';
import { derived, get, writable } from 'svelte/store';

import { WorkSession } from '$classes/work-session';
import { isFromToday } from '$lib/utils/is-from-today';
import type { WorkSessionsFromSupabase } from '$models/work-session';
import { WorkSessionsHTTPService } from '$services/supabase/work-sessions';

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

	async init() {
		const { data, error, status } = await WorkSessionsHTTPService.getAll();

		if (data === null) {
			console.error(status);
			throw new Error(error?.message);
		}

		const workSessions = data.map((workSession) => new WorkSession(workSession));

		this.set(workSessions);
	}

	findById(id: string) {
		const session = get(this).find((session) => session.id === id);

		return session;
	}

	add(workSessionObject: WorkSessionsFromSupabase) {
		const newWorkSession = new WorkSession(workSessionObject);
		this.update((sessions) => [...sessions, newWorkSession]);

		return newWorkSession;
	}

	delete(id: string) {
		const session = this.findById(id);
		if (!session) {
			throw new Error(`Session with id ${id} not found`);
		}

		this.update((sessions) => sessions.filter((session) => session.id !== id));

		return session;
	}

	// TODO: this could eventually accept queries
	// for example: be get all({ fromToday: true }})
	get all$() {
		return derived(this, (workSessions) => workSessions);
	}

	// TODO: Variable "today" should come from clock
	// import clock inside utils/is-from-today.ts and get today from there
	get allFromToday$() {
		const today = DateTime.now();

		return derived(this, (workSessions) => {
			return workSessions.filter(({ createdAt }) =>
				isFromToday({
					today,
					dateToCompare: createdAt
				})
			);
		});
	}

	get totalTimeFromTodayInHours$() {
		return derived(this.allFromToday$, (workSessions) => {
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
}
