// import type { Category } from '$classes/category';
import type { Database } from '$lib/supabase/types';

// interface TaskObject {
// 	id: number;
// 	name: string;
// 	createdAt: string;
// 	updatedAt: string;
// 	category: Category;
// }

// export interface CreateTaskProps extends Pick<TaskObject, 'name'> {
// 	categoryId: string;
// }

// Types from supabase
// Task Props represents TasksService.getAll() return type
type TaskColumns = Database['public']['Tables']['tasks']['Row'];
type CategoryColumns = Database['public']['Tables']['categories']['Row'];
// .getAll() explicitly includes the category column
export type TaskFromSupabase = Omit<TaskColumns, 'category'> & {
	category: CategoryColumns;
};

export type CreateTaskInSupabase = Database['public']['Tables']['tasks']['Insert'];

// export type CreateTaskInSupabase = Omit<
// 	Database['public']['Tables']['tasks']['Insert'],
// 	'category'
// > & {
// 	categoryId: string;
// };
