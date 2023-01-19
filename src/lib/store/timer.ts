import { DateTime } from 'luxon';

import type { TimerState } from '$classes/custom-stores/timer-store';
import { Notification } from '$classes/notification';
import { type TimerSettings, TimerStore } from '$lib/classes/custom-stores/timer-store';
import { createWorkSession } from '$services/memory/work-sessions';
import { tasksStore } from '$store/tasks';

// TODO: Document this pattern
// It's really useful 
const timerSettings: TimerSettings = {
	durationInMinutes: 25,
	environment: 'production',
	// onStart: handleTimerStart,
	onFinish: handleTimerFinish
};

// function handleTimerStart() {
// 	void Notification.send({ preset: 'work-session-finished' });
// }

function handleTimerFinish(timer: TimerState) {
	// TODO: Timer state should provide current task
	// It should have a property for current-task
	// At the end of the day, when you set the current-task, you are setting that property for the timer

	void Notification.send({ preset: 'work-session-finished' });
	void createWorkSession({
		startedTimeInISO: timer.startedTime.toISO(),
		endTimeInISO: DateTime.now().toISO(),
		durationInMinutes: timer.durationInMinutes,
		taskId: tasksStore.current?.id,
		categoryId: tasksStore.current?.category.id
	});
}

export const timerStore = new TimerStore(timerSettings);
