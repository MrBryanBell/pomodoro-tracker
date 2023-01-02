import { get } from 'svelte/store';
import { vi } from 'vitest';

import type { TimerSettings } from '$lib/models/classes/custom-stores/timer';
import { Timer } from '$lib/models/classes/custom-stores/timer';

describe('Timer', () => {
	let timer: Timer;

	beforeEach(() => {
		const timerSettings: TimerSettings = { durationInMinutes: 25 };
		timer = new Timer(timerSettings);
	});

	it('should be an instance of Timer', () => {
		expect(timer).toBeInstanceOf(Timer);
	});

	it('should have a property named "isPaused" with a boolean value ', () => {
		const isPaused = get(timer.isPaused$);
		expect(typeof isPaused).toBe('boolean');
	});

	it('should be paused by default', () => {
		expect(get(timer.isPaused$)).toBe(true);
	});

	it('should have a duration of 25 minutes', () => {
		const durationInMinutes = get(timer.durationInMinutes$);
		expect(durationInMinutes).toBe(25);
	});

	it('should return a formatted string (mm:ss) showing the time left', () => {
		const timeLeftInMinutes = get(timer.timeLeftInMinutes$);
		expect(typeof timeLeftInMinutes).toBe('string');
		expect(timeLeftInMinutes).toBe('25:00');
	});

	it('should have "24:30" as timeLeft after 30 seconds of being started', () => {
		vi.useFakeTimers();

		timer.start();

		// Advance the timer by 30 seconds
		vi.advanceTimersByTime(30000);
		let timeLeftInMinutes = get(timer.timeLeftInMinutes$);

		expect(timeLeftInMinutes).toBe('24:30');

		// Advance the timer by 30 seconds
		vi.advanceTimersByTime(30000);
		timeLeftInMinutes = get(timer.timeLeftInMinutes$);

		expect(timeLeftInMinutes).toBe('24:00');
	});

	it('should pause countdown after pausing the timer', () => {
		vi.useFakeTimers();
		let timeLeftInMinutes = get(timer.timeLeftInMinutes$);
		expect(timeLeftInMinutes).toBe('25:00');

		timer.start();

		// Advance the timer by 30 seconds
		vi.advanceTimersByTime(30000);
		timeLeftInMinutes = get(timer.timeLeftInMinutes$);

		expect(timeLeftInMinutes).toBe('24:30');

		timer.pause();

		// Advance the timer by 30 seconds
		vi.advanceTimersByTime(30000);
		timeLeftInMinutes = get(timer.timeLeftInMinutes$);

		// The timer should not have advanced
		expect(timeLeftInMinutes).toBe('24:30');
	});

	it('should have "isPaused: false" after starting the timer', () => {
		let isPaused = get(timer.isPaused$);
		expect(isPaused).toBe(true);

		timer.start();
		isPaused = get(timer.isPaused$);
		expect(isPaused).toBe(false);
	});

	it('should have "isPaused: true" after pausing the timer', () => {
		let isPaused = get(timer.isPaused$);
		expect(isPaused).toBe(true);

		timer.start();
		isPaused = get(timer.isPaused$);
		expect(isPaused).toBe(false);

		timer.pause();
		isPaused = get(timer.isPaused$);
		expect(isPaused).toBe(true);
	});

	it('should have "isPaused: true" after the timer ends', () => {
		let isPaused = get(timer.isPaused$);
		const minutes = 25;
		const milliseconds = minutes * 60 * 1000;

		vi.useFakeTimers();
		timer.start();
		isPaused = get(timer.isPaused$);
		expect(isPaused).toBe(false);

		vi.advanceTimersByTime(milliseconds);
		isPaused = get(timer.isPaused$);
		expect(isPaused).toBe(true);
	});
});
