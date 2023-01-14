/* eslint-disable curly */
import type { CreateCategoryProps } from '$lib/models/category';
import supabase from '$lib/supabase/client';
// import type { Database } from '$lib/supabase/types';
// type CategoryProps = Database['public']['Tables']['categories']['Insert'];

export class CategoriesService {
	private static readonly client = supabase;

	public static async getAll() {
		const { data, error } = await this.client.from('categories').select('*');

		if (data === null) throw new Error(error.message);

		return data;
	}

	public static async create({ name }: CreateCategoryProps) {
		const { data, error } = await this.client
			.from('categories')
			.insert({ name })
			.select('*')
			.single();
		if (data === null) throw new Error(error.message);

		return data;
	}
}
