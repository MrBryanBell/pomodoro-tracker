import { DateTime } from 'luxon';

import type { ICategory } from '$models/category';
import type { ITask } from '$models/task';
import type { WorkSessionsFromSupabase } from '$models/work-session';

export class WorkSession {
	public id: string;
	public startedTimeInISO: string;
	public endTimeInISO: string;
	public durationInMinutes: number;
	public task: Pick<ITask, 'id' | 'name'>;
	public category: Pick<ICategory, 'id' | 'name'>;
	public createdAt: DateTime;
	public updatedAt: DateTime;

	constructor({
		id,
		startedTimeInISO,
		endTimeInISO,
		durationInMinutes,
		taskId,
		createdAt,
		updatedAt,
		categoryId
	}: WorkSessionsFromSupabase) {
		this.id = id;
		this.createdAt = DateTime.fromISO(createdAt, { zone: 'local' });
		this.updatedAt = DateTime.fromISO(updatedAt, { zone: 'local' });
		this.task = taskId;
		this.category = categoryId;
		this.startedTimeInISO = startedTimeInISO;
		this.endTimeInISO = endTimeInISO;
		this.durationInMinutes = durationInMinutes;
	}
}
