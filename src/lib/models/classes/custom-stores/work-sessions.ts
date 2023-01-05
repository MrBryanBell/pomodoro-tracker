import { derived, get, writable } from 'svelte/store';

import { type WorkSessionObject, WorkSession } from '../work-session';

export class WorkSessions {
	public readonly subscribe;
	private readonly update;
	private readonly set;

	constructor() {
		const { subscribe, update, set } = writable<WorkSession[]>([]);
		this.subscribe = subscribe;
		this.update = update;
		this.set = set;
	}

	get sessions$() {
		return derived(this, ($this) => $this);
	}

	add(workSessionObject: WorkSessionObject) {
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
