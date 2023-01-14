import { type TimerSettings, TimerStore } from '$lib/classes/custom-stores/timer-store';

const timerSettings: TimerSettings = { durationInMinutes: 25 };
export const timerStore = new TimerStore(timerSettings);
