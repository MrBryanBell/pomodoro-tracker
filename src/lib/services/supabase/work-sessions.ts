/* eslint-disable curly */
/* eslint-disable @typescript-eslint/unbound-method */
import type { PostgrestError } from '@supabase/supabase-js';

import supabase from '$lib/supabase/client';
import type { CreateWorkSessionProps, WorkSessionsFromSupabase } from '$models/work-session';

type returnObject<T> = {
	data: T | null;
	error: PostgrestError | null;
	status: number;
};

export class WorkSessionsHTTPService {
	static tableName = 'work-sessions';
	static getQuery = '*, taskId(id, name), categoryId(id, name)';

	static async getAll() {
		const { data, error, status } = await supabase.from(this.tableName).select(this.getQuery);

		// this is a hack to get around the fact that supabase doesn't return the complete type (it's nested)
		return { data, error, status } as returnObject<WorkSessionsFromSupabase[]>;
	}

	static async create(workSession: CreateWorkSessionProps) {
		const { data, error, status } = await supabase
			.from(this.tableName)
			.insert(workSession)
			.select(this.getQuery)
			.single();

		return { data, error, status } as returnObject<WorkSessionsFromSupabase>;
	}

	static async delete(id: string) {
		const { data, error, status } = await supabase
			.from(this.tableName)
			.delete()
			.match({ id })
			.select(this.getQuery)
			.single();

		data as unknown as WorkSessionsFromSupabase;

		return { data, error, status } as returnObject<WorkSessionsFromSupabase>;
	}
}
