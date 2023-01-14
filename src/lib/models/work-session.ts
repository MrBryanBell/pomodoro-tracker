import type { Task } from '$classes/task';

interface WorkSessionObject {
	id: number;
	startTimeInISO: string;
	endTimeInISO: string;
	durationInMinutes: number;
	task: Task;
}

export type CreateWorkSessionProps = Omit<WorkSessionObject, 'id'>;
