import type { PostgrestError } from '@supabase/supabase-js';

import supabase from '$lib/supabase/client';
import type { CreateTaskProps, TaskFromSupabase } from '$models/task';

type returnObject<T> = {
	data: T | null;
	error: PostgrestError | null;
	status: number;
};

export class TasksHTTPService {
	static tableName = 'frequent-tasks';
	static getQuery = '*, categoryId(id, name)';

	static async getAll() {
		const { error, status, data } = await supabase.from(this.tableName).select(this.getQuery);

		// this is a hack to get around the fact that supabase doesn't return the complete type (it's nested)
		return { data, error, status } as returnObject<TaskFromSupabase[]>;
	}

	static async create(taskProps: CreateTaskProps) {
		const { data, error, status } = await supabase
			.from(this.tableName)
			.insert(taskProps)
			.select(this.getQuery)
			.single();

		return { data, error, status } as returnObject<TaskFromSupabase>;
	}

	static async delete(id: string) {
		const { data, error, status } = await supabase
			.from(this.tableName)
			.delete()
			.match({ id })
			.select(this.getQuery)
			.single();

		return { data, error, status } as returnObject<TaskFromSupabase>;
	}
}
