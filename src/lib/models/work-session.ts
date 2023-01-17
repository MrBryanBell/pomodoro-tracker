import type { Database } from '$lib/supabase/types';
import type { ICategory } from '$models/category';
import type { ITask } from '$models/task';

// getAll() - From Supabase
type WorkSessionColumns = Database['public']['Tables']['work-sessions']['Row'];
type TaskColumns = Database['public']['Tables']['tasks']['Row'];
type CategoryColumns = Database['public']['Tables']['categories']['Row'];
export type WorkSessionsFromSupabase = WorkSessionColumns & {
	taskId: Pick<TaskColumns, 'id' | 'name'>;
	categoryId: Pick<CategoryColumns, 'id' | 'name'>;
};

interface IWorkSession {
	id: string;
	startedTimeInISO: string;
	endTimeInISO: string;
	durationInMinutes: number;
	task: Pick<ITask, 'id' | 'name'>;
	category: Pick<ICategory, 'id' | 'name'>;
	createdAt: string;
	updatedAt: string;
}

export type CreateWorkSessionProps = Database['public']['Tables']['work-sessions']['Insert'];

// Create a new WorkSession from browser or by fetching from Supabase
// How to read this type:
// 1. All properties, except: id, created_at, updated_at
// 2. Optional properties of Pick: id, created_at, updated_at
// export type CreateWorkSessionProps = Omit<IWorkSession, 'id' | 'createdAt' | 'updatedAt'> &
// 	Partial<Pick<IWorkSession, 'id' | 'createdAt' | 'updatedAt'>>;
