import type { CreateTaskInSupabase } from '$models/task';
import { TasksService } from '$services/supabase/tasks';
import { tasksStore } from '$store/tasks';

export async function createTask({ name, category }: CreateTaskInSupabase) {
	const newTask = await TasksService.create({ name, category });
	tasksStore.add(newTask);
}

export async function deleteTask(id: string) {
	await TasksService.delete(id);
	tasksStore.delete(id);
}
