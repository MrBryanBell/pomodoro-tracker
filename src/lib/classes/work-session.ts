import type { Task } from '$classes/task';
import type { CreateWorkSessionProps } from '$models/work-session';

export class WorkSession {
	public id: string;
	public startTimeInISO: string;
	public endTimeInISO: string;
	public durationInMinutes: number;
	public task: Task;

	constructor({ startTimeInISO, endTimeInISO, durationInMinutes, task }: CreateWorkSessionProps) {
		this.id = crypto.randomUUID();
		this.startTimeInISO = startTimeInISO;
		this.endTimeInISO = endTimeInISO;
		this.durationInMinutes = durationInMinutes;
		this.task = task;
	}
}
