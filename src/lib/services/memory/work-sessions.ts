import type { CreateWorkSessionProps } from '$models/work-session';
import { WorkSessionsHTTPService } from '$services/supabase/work-sessions';
import { workSessionsStore } from '$store/work-sessions';

export async function createWorkSession(workSessionProps: CreateWorkSessionProps) {
	const { data: createdWorkSession, error } = await WorkSessionsHTTPService.create(
		workSessionProps
	);

	if (!createdWorkSession) {
		console.error(error);
		throw new Error('Could not create work session');
	}
	workSessionsStore.add(createdWorkSession);
}

export async function deleteWorkSession(id: string) {
	const { status } = await WorkSessionsHTTPService.delete(id);
	if (status !== 200) {
		throw new Error('Could not delete work session');
	}
	workSessionsStore.delete(id);
}
