/* eslint-disable @typescript-eslint/member-ordering */
import { DateTime } from 'luxon';
import { derived, get, writable } from 'svelte/store';

import { clock } from '$store/clock';

// The object the store will hold
// TODO: add type for onFinish and onStart: code is duplicated
export interface TimerState {
	durationInMinutes: number;
	environment: 'development' | 'production' | 'test';
	startedTime: DateTime;
	timeLeftInSeconds: number;
	isPaused: boolean;
	onStart?: () => void;
	onFinish?: (timerState: TimerState) => void;
}

// The object that will be passed to the constructor
export interface TimerSettings {
	durationInMinutes: number;
	environment: 'development' | 'production' | 'test';
	onStart?: () => void;
	onFinish?: (timerState: TimerState) => void;
}

export class TimerStore {
	public subscribe;
	private readonly update;
	private readonly set;
	private interval: null | ReturnType<typeof setInterval> = null;

	constructor({ durationInMinutes, environment, onFinish }: TimerSettings) {
		const init: TimerState = {
			durationInMinutes,
			environment,
			onFinish,
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

		const onFinishCallback = get(this).onFinish;
		if (onFinishCallback) {
			onFinishCallback(get(this));
		}
	}

	private clear() {
		// timer.startedTime = null;
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

	// TODO: move interval to a separate method
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

		const onStartCallback = get(this).onStart;
		if (onStartCallback) {
			onStartCallback();
		}
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
}
