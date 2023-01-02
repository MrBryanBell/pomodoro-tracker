import { type TimerSettings, Timer } from '$models/classes/custom-stores/timer';

const timerSettings: TimerSettings = { durationInMinutes: 25 };
export const timer = new Timer(timerSettings);
