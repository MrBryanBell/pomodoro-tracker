// Description: a universal clock for the whole app
// Usage: import { clock } from './$store/clock.ts'
// it updates itself every second: value is a luxon DateTime object

import { DateTime } from 'luxon';
import { readable } from 'svelte/store';

function initClock() {
	return readable(DateTime.now(), (set) => {
		const interval = setInterval(() => {
			set(DateTime.now());
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
}

export class Clock {
	public subscribe;

	constructor() {
		const { subscribe } = initClock();
		this.subscribe = subscribe;
	}
}
