import supabase from '$lib/supabase/client';
import type { CreateTaskInSupabase, TaskFromSupabase } from '$models/task';

export class TasksService {
	static async getAll() {
		const { data, error } = await supabase.from('tasks').select('*, category(*)');

		if (data === null) {
			throw new Error(error.message);
		}

		return data as unknown as TaskFromSupabase[];
	}

	static async create({ name, category }: CreateTaskInSupabase) {
		const { data, error } = await supabase
			.from('tasks')
			.insert({ name, category })
			.select('*, category(*)')
			.single();
		if (data === null) {
			throw new Error(error.message);
		}

		return data as unknown as TaskFromSupabase;
	}

	static async delete(id: string) {
		const { error } = await supabase.from('tasks').delete().match({ id });
		if (error) {
			throw new Error(error.message);
		}
	}
}
