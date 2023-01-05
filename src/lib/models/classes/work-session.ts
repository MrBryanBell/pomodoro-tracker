interface IWorkSession {
	id: number;
	startTimeInISO: string;
	endTimeInISO: string;
	durationInMinutes: number;
}

export type WorkSessionObject = Omit<IWorkSession, 'id'>;

export class WorkSession {
	public id: string;
	public startTimeInISO: string;
	public endTimeInISO: string;
	public durationInMinutes: number;

	constructor({ startTimeInISO, endTimeInISO, durationInMinutes }: WorkSessionObject) {
		this.id = crypto.randomUUID();
		this.startTimeInISO = startTimeInISO;
		this.endTimeInISO = endTimeInISO;
		this.durationInMinutes = durationInMinutes;
	}
}
