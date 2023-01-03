// import { type DateObjectUnits, DateTime } from 'luxon';
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

	describe('isPaused$ property', () => {
		it('should be a boolean value ', () => {
			const isPaused = get(timer.isPaused$);
			expect(typeof isPaused).toBe('boolean');
		});

		it('should be true by default', () => {
			expect(get(timer.isPaused$)).toBe(true);
		});
	});

	describe('durationInMinutes$ property', () => {
		it('should have a duration of 25 minutes', () => {
			const durationInMinutes = get(timer.durationInMinutes$);
			expect(durationInMinutes).toBe(25);
		});
	});

	describe('timeLeftInMinutes$ property', () => {
		it('should be a string', () => {
			const timeLeftInMinutes = get(timer.timeLeftInMinutes$);
			expect(typeof timeLeftInMinutes).toBe('string');
		});

		it('should return a formatted string (mm:ss) showing the time left', () => {
			const timeLeftInMinutes = get(timer.timeLeftInMinutes$);
			expect(timeLeftInMinutes).toBe('25:00');
		});

		it('should return "24:30" after 30 seconds of being started', () => {
			vi.useFakeTimers();
			let timeLeftInMinutes: string | undefined = undefined;
			const unsubscribe = timer.timeLeftInMinutes$.subscribe((value) => {
				timeLeftInMinutes = value;
			});

			// Start the timer
			timer.start();

			// Advance 30 seconds (virtual time)
			vi.advanceTimersByTime(30000);
			expect(timeLeftInMinutes).toBe('24:30');

			// Advance 30 seconds more (virtual time)
			vi.advanceTimersByTime(30000);
			expect(timeLeftInMinutes).toBe('24:00');

			unsubscribe();
		});
	});

	describe('start() method', () => {
		it('should set isPaused$ to false', () => {
			timer.start();
			const isPaused = get(timer.isPaused$);

			expect(isPaused).toBe(false);
		});
	});

	describe('pause() method', () => {
		it('should have the same timeLeftInMinutes$ value after invoking', () => {
			vi.useFakeTimers();
			let timeLeftInMinutes: string | undefined = undefined;
			const unsubscribe = timer.timeLeftInMinutes$.subscribe((value) => {
				timeLeftInMinutes = value;
			});
			const expectedResult = '24:30';

			// Start timer and advance virtual-time by 30 seconds
			timer.start();
			vi.advanceTimersByTime(30000);
			expect(timeLeftInMinutes).toBe(expectedResult);

			// Pause timer and advance virtual-time by 30 seconds
			timer.pause();
			vi.advanceTimersByTime(30000);
			// timeLeftInMinutes should still be '24:30'
			expect(timeLeftInMinutes).toBe(expectedResult);

			unsubscribe();
		});

		it('should set isPaused$ to true after invoking', () => {
			let isPaused: boolean | undefined = undefined;
			const unsubscribe = timer.isPaused$.subscribe((value) => {
				isPaused = value;
			});

			// Start timer and pause it
			timer.start();
			timer.pause();

			expect(isPaused).toBe(true);
			unsubscribe();
		});
	});

	it('should have "isPaused: true" after the timer ends', () => {
		vi.useFakeTimers();
		let isPaused: boolean | undefined = undefined;
		const unsubscribe = timer.isPaused$.subscribe((value) => {
			isPaused = value;
		});
		const minutes = 25;
		const milliseconds = minutes * 60 * 1000;

		timer.start();
		expect(isPaused).toBe(false);

		vi.advanceTimersByTime(milliseconds);
		expect(isPaused).toBe(true);
		unsubscribe();
	});

	describe('restart() method', () => {
		it('should set time left to "25:00" after invoking', () => {
			vi.useFakeTimers();
			const seconds = 30;
			let timeLeftInMinutes: string | undefined = undefined;
			const unsubscribe = timer.timeLeftInMinutes$.subscribe((value) => {
				timeLeftInMinutes = value;
			});

			// Start timer and advance virtual-time by 30 seconds
			timer.start();
			vi.advanceTimersByTime(seconds * 1000);
			timer.pause();
			expect(timeLeftInMinutes).toBe('24:30');

			// Restart timer
			timer.restart();
			expect(timeLeftInMinutes).toBe('25:00');

			unsubscribe();
		});
	});

	describe('setDurationInMinutes() method', () => {
		it('should have "20" as duration after invoking', () => {
			timer.setDurationInMinutes(20);
			const durationInMinutes = get(timer.durationInMinutes$);
			expect(durationInMinutes).toBe(20);
		});
	});
});
