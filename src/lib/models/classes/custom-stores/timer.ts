/* eslint-disable @typescript-eslint/member-ordering */
import { DateTime } from 'luxon';
import { derived, get, writable } from 'svelte/store';

import { workSessions } from '$lib/store/work-sessions';
import { clock } from '$store/clock';

import type { WorkSessionObject } from '../work-session';

export interface TimerSettings {
	durationInMinutes: number;
}

interface TimerState {
	durationInMinutes: number;
	startedTime: DateTime;
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
			startedTime: DateTime.now(),
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
			const timeLeftInMs = DateTime.fromMillis(timer.timeLeftInSeconds * 1000);

			return timeLeftInMs.toFormat('mm:ss');
		});
	}

	private decreaseTimeLeft() {
		this.update((timer) => {
			timer.timeLeftInSeconds -= 1;

			return timer;
		});
	}

	private finish() {
		this.pause();
		this.addNewWorkSession();
	}

	private clear() {
		this.update((timer) => {
			// timer.startedTime = null;

			return timer;
		});
		this.interval = null;
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

	// needs: decreaseTimeLeft, finish, clear
	// move interval to a separate method
	start() {
		const timeLeftInSeconds = get(this).timeLeftInSeconds;
		if (timeLeftInSeconds === 0) {
			return;
		}
		this.update((timer) => {
			timer.startedTime = DateTime.now();
			timer.isPaused = false;

			return timer;
		});

		this.interval = setInterval(() => {
			this.decreaseTimeLeft();
			const timeLeftInSeconds = get(this).timeLeftInSeconds;
			if (timeLeftInSeconds === 0) {
				this.finish();
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

	setDurationInMinutes(duration: number) {
		this.update((timer) => {
			timer.durationInMinutes = duration;
			timer.timeLeftInSeconds = duration * 60;

			return timer;
		});
	}

	get formattedEndTime$() {
		return derived([this, clock], ([timer, clock]) => {
			const dateTimeFromTimeLeft = DateTime.fromMillis(timer.timeLeftInSeconds * 1000);
			const endTime = clock.plus({ milliseconds: dateTimeFromTimeLeft.toMillis() });

			return endTime.toFormat('hh:mma');
		});
	}

	get elapsedTimeInMinutes$() {
		return derived(this, (timer) => {
			const { durationInMinutes, timeLeftInSeconds } = timer;
			const timeLeftInMinutes = timeLeftInSeconds / 60;
			const elapsedTimeInMinutes = durationInMinutes - timeLeftInMinutes;

			return Math.round(elapsedTimeInMinutes * 10) / 10;
		});
	}

	private addNewWorkSession() {
		const workSessionProps: WorkSessionObject = {
			startTimeInISO: get(this).startedTime.toISO(),
			durationInMinutes: get(this.elapsedTimeInMinutes$),
			endTimeInISO: DateTime.now().toISO()
		};

		workSessions.add(workSessionProps);
	}
}
