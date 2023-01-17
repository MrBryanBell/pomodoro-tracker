import type { Database } from '$lib/supabase/types';

export interface ICategory {
	id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
}

// export type CreateCategoryProps = Pick<ICategory, 'name'> &
// 	Partial<Pick<ICategory, 'id' | 'createdAt' | 'updatedAt'>>;

export type CreateCategoryProps = Database['public']['Tables']['categories']['Insert'];

export type CategoryFromSupabase = Database['public']['Tables']['categories']['Row'];
