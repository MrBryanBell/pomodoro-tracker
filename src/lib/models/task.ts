import type { Database } from '$lib/supabase/types';
import type { ICategory } from '$models/category';

export interface ITask {
	id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
	category: Pick<ICategory, 'id' | 'name'>;
}

// export interface CreateTaskProps extends Pick<TaskObject, 'name'> {
// 	categoryId: string;
// }

// .getAll() explicitly includes the category column
type TaskColumns = Database['public']['Tables']['frequent-tasks']['Row'];
type CategoryColumns = Database['public']['Tables']['categories']['Row'];
export type TaskFromSupabase = TaskColumns & {
	categoryId: Pick<CategoryColumns, 'id' | 'name'>;
};

export type CreateTaskProps = Database['public']['Tables']['frequent-tasks']['Insert'];

// export type CreateTaskProps = Pick<ITask, 'name' | 'category'> &
// 	Partial<Pick<ITask, 'id' | 'createdAt' | 'updatedAt'>>;

// export type CreateTaskInSupabase = Omit<
// 	Database['public']['Tables']['tasks']['Insert'],
// 	'category'
// > & {
// 	categoryId: string;
// };
