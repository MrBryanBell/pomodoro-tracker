import type { Task } from './task';

interface IWorkSession {
	id: number;
	startTimeInISO: string;
	endTimeInISO: string;
	durationInMinutes: number;
	task: Task;
}

export type WorkSessionObject = Omit<IWorkSession, 'id'>;

export class WorkSession {
	public id: string;
	public startTimeInISO: string;
	public endTimeInISO: string;
	public durationInMinutes: number;
	public task: Task;

	constructor({ startTimeInISO, endTimeInISO, durationInMinutes, task }: WorkSessionObject) {
		this.id = crypto.randomUUID();
		this.startTimeInISO = startTimeInISO;
		this.endTimeInISO = endTimeInISO;
		this.durationInMinutes = durationInMinutes;
		this.task = task;
	}
}
