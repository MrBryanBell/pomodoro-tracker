import { DateTime } from 'luxon';
import { get } from 'svelte/store';
import { vi } from 'vitest';

import type { TimerSettings } from '$lib/classes/custom-stores/timer-store';
import { TimerStore as Timer } from '$lib/classes/custom-stores/timer-store';
import { categoriesStore as categories } from '$store/categories';
import { tasksStore as tasks } from '$store/tasks';

describe('Timer', () => {
	let timer: Timer;
	categories.add({
		name: 'Eslint',
		id: '1',
		updatedAt: DateTime.now().toISO(),
		createdAt: DateTime.now().toISO()
	});
	const { name: newTaskName } = tasks.add({ name: 'Configuración Eslint', categoryId: '1' });
	tasks.setCurrentByName(newTaskName);

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

		it('should not start if time-left is 00:00', () => {
			vi.useFakeTimers();
			let timeLeftInMinutes: string | undefined = undefined;
			const unsubscribe = timer.timeLeftInMinutes$.subscribe((value) => {
				timeLeftInMinutes = value;
			});

			// Start timer and advance virtual-time by 25 minutes
			timer.start();
			vi.advanceTimersByTime(25 * 60 * 1000);
			expect(timeLeftInMinutes).toBe('00:00');

			// Start timer again
			timer.start();
			// timeLeftInMinutes should still be '00:00'
			vi.advanceTimersByTime(5 * 60 * 1000);
			expect(timeLeftInMinutes).toBe('00:00');

			unsubscribe();
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

	describe('formattedEndTime$ property', () => {
		it('should return a string', () => {
			const endTime = get(timer.formattedEndTime$);
			expect(typeof endTime).toBe('string');
		});

		it('should return a string in format "hh:mma", ex: "05:30AM"', () => {
			const endTime = get(timer.formattedEndTime$);
			const regex = new RegExp(/^(0[0-9]|1[0-2]):[0-5][0-9](AM|PM)$/);
			expect(regex.test(endTime)).toBe(true);
		});

		it('should return endTime: $clock + Timer-timeLeft-milliseconds', () => {
			// Using real timers because it's almost impossible to mock Luxon in vitest
			// a better solution would be to mock vitest's virtual time to an specific time (ex: 2023-01-01 8:00:00) and verify that the end-time is 8:25
			vi.useRealTimers();

			const now = DateTime.now();
			// My local time
			now.toFormat('hh:mma'); //?
			// My local time + 25 minutes
			const expectedEndTime = now.plus({ minutes: 25 }).toFormat('hh:mma'); //?

			const endTime = get(timer.formattedEndTime$);
			expect(endTime).toBe(expectedEndTime);
		});
	});

	describe('elapsedTimeInMinutes$ property', () => {
		it('should return a number', () => {
			const elapsedTime = get(timer.elapsedTimeInMinutes$);
			expect(typeof elapsedTime).toBe('number');
			expect(elapsedTime).not.toBeNaN();
		});

		it('should be 0 or a positive number', () => {
			const elapsedTime = get(timer.elapsedTimeInMinutes$);
			expect(elapsedTime).toBeGreaterThanOrEqual(0);
		});

		it('should return 10', () => {
			vi.useFakeTimers();
			const minutesToAdvance = 10;

			// Advance time by 10 minutes
			timer.start();
			vi.advanceTimersByTime(minutesToAdvance * 60 * 1000);
			timer.pause();

			const elapsedTime = get(timer.elapsedTimeInMinutes$);
			expect(elapsedTime).toBe(10);
		});

		it('should not change if timer is paused', () => {
			// Arrange
			vi.useFakeTimers();
			const minutesToAdvance = 15;
			let elapsedTime: number | undefined = undefined;
			const unsubscribe = timer.elapsedTimeInMinutes$.subscribe((value) => {
				elapsedTime = value;
			});

			// Act
			timer.start();
			vi.advanceTimersByTime(minutesToAdvance * 60 * 1000);
			timer.pause();
			// advance 5 minutes more
			vi.advanceTimersByTime(5 * 60 * 1000);

			// Assert
			expect(elapsedTime).toBe(15);
			unsubscribe();
		});
	});
});
