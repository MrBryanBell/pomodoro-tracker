/* eslint-disable curly */
import type { CreateCategoryProps } from '$lib/models/category';
import supabase from '$lib/supabase/client';
// import type { Database } from '$lib/supabase/types';
// type CategoryProps = Database['public']['Tables']['categories']['Insert'];

export class CategoriesService {
	static async getAll() {
		const { data, error } = await supabase.from('categories').select('*');

		if (data === null) throw new Error(error.message);

		return data;
	}

	static async create({ name }: CreateCategoryProps) {
		const { data, error } = await supabase.from('categories').insert({ name }).select('*').single();
		if (data === null) throw new Error(error.message);

		return data;
	}

	static async delete(id: string) {
		const { data, error } = await supabase
			.from('categories')
			.delete()
			.match({ id })
			.select('*')
			.single();

		if (data === null) throw new Error(error.message);

		return data;
	}
}
