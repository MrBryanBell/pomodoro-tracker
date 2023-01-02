/* eslint-disable @typescript-eslint/member-ordering */
import { derived, get, writable } from 'svelte/store';

export interface TimerSettings {
	durationInMinutes: number;
}

interface TimerState {
	durationInMinutes: number;
	startedTime: string;
	timeLeftInSeconds: number;
	isPaused: boolean;
}

export class Timer {
	public subscribe;
	private readonly update;
	private readonly set;
	private interval: null | ReturnType<typeof setInterval> = null;

	constructor({ durationInMinutes }: TimerSettings) {
		const init: TimerState = {
			durationInMinutes,
			startedTime: new Date().toISOString(),
			timeLeftInSeconds: durationInMinutes * 60,
			isPaused: true
		};
		const { subscribe, update, set } = writable<TimerState>(init);
		this.subscribe = subscribe;
		this.update = update;
		this.set = set;
	}

	get isPaused$() {
		return derived(this, (timer) => timer.isPaused);
	}

	get durationInMinutes$() {
		return derived(this, (timer) => timer.durationInMinutes);
	}

	get timeLeftInMinutes$() {
		return derived(this, (timer) => {
			const timeLeftInISO = new Date(timer.timeLeftInSeconds * 1000).toISOString();

			return timeLeftInISO.slice(14, 19);
		});
	}

	private finish() {
		this.pause();
	}

	pause() {
		this.update((timer) => {
			timer.isPaused = true;

			return timer;
		});

		if (this.interval) {
			clearInterval(this.interval);
		}
	}

	private clear() {
		this.update((timer) => {
			// timer.startedTime = null;

			return timer;
		});
		this.interval = null;
	}

	private decreaseTimeLeft() {
		this.update((timer) => {
			timer.timeLeftInSeconds -= 1;

			return timer;
		});
	}

	start() {
		this.update((timer) => {
			timer.startedTime = new Date().toISOString();
			timer.isPaused = false;

			return timer;
		});

		this.interval = setInterval(() => {
			this.decreaseTimeLeft();
			const timeLeftInSeconds = get(this).timeLeftInSeconds;
			if (timeLeftInSeconds === 0) {
				this.finish();
				// this.addNewWorkSession();
				this.clear();
			}
		}, 1000);
	}

	restart() {
		this.update((timer) => {
			timer.timeLeftInSeconds = timer.durationInMinutes * 60;

			return timer;
		});
	}
}
