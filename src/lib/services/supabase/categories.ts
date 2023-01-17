import type { PostgrestError } from '@supabase/supabase-js';

import type { CategoryFromSupabase, CreateCategoryProps } from '$lib/models/category';
import supabase from '$lib/supabase/client';

type returnObject<T> = {
	data: T | null;
	error: PostgrestError | null;
	status: number;
};

export class CategoriesHTTPService {
	static tableName = 'categories';
	static getQuery = '*';

	static async getAll() {
		const { data, error, status } = await supabase.from(this.tableName).select(this.getQuery);

		return { data, error, status } as returnObject<CategoryFromSupabase[]>;
	}

	static async create(category: CreateCategoryProps) {
		const { data, error, status } = await supabase
			.from(this.tableName)
			.insert(category)
			.select(this.getQuery)
			.single();

		return { data, error, status } as returnObject<CategoryFromSupabase>;
	}

	static async delete(id: string) {
		const { data, error, status } = await supabase
			.from(this.tableName)
			.delete()
			.match({ id })
			.select(this.getQuery)
			.single();

		return { data, error, status } as returnObject<CategoryFromSupabase>;
	}
}
