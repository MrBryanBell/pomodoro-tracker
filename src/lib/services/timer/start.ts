import { Notification } from '$classes/notification';
import { tasksStore } from '$lib/store/tasks';
import { timerStore as timer } from '$store/timer';

export function startTimer() {
	if (tasksStore.current === null) {
		void Notification.send({ preset: 'error:please-select-a-task' });

		return;
	}
	timer.start();
	void Notification.send({ preset: 'work-session-started' });
}
