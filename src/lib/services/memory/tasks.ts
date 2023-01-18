import type { CreateTaskProps } from '$models/task';
import { TasksHTTPService } from '$services/supabase/tasks';
import { tasksStore } from '$store/tasks';

export async function createTask(taskProps: CreateTaskProps) {
	const { data: createdTask } = await TasksHTTPService.create(taskProps);
	if (!createdTask) {
		throw new Error('Could not create task');
	}
	tasksStore.add(createdTask);
}

export async function deleteTask(id: string) {
	const { status, error } = await TasksHTTPService.delete(id);
	if (status !== 200) {
		console.error(error);
		throw new Error('Could not delete task');
	}
	tasksStore.delete(id);
}
