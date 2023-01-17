import type { Database } from '$lib/supabase/types';
import type { ICategory } from '$models/category';
import type { ITask } from '$models/task';

// getAll() - From Supabase
type WorkSessionColumns = Database['public']['Tables']['work-sessions']['Row'];
type TaskColumns = Database['public']['Tables']['frequent-tasks']['Row'];
type CategoryColumns = Database['public']['Tables']['categories']['Row'];

export type WorkSessionsFromSupabase = Omit<WorkSessionColumns, 'categoryId' | 'taskId'> & {
	categoryId: Pick<CategoryColumns, 'id' | 'name'>;
	taskId: Pick<TaskColumns, 'id' | 'name'>;
};

const ws: exp = {
	id: '1',
	startedTimeInISO: '2023-01-05T03:42:46.458-06:00',
	categoryId: {
		id: '1',
		name: 'Test Category'
	},
	taskId: {
		id: '1',
		name: 'Test Task'
	},
	durationInMinutes: 20,
	endTimeInISO: '2023-01-05T03:22:32.324-06:00',
	userId: '1',
	createdAt: '2023-01-05T03:42:46.458-06:00',
	updatedAt: '2023-01-05T03:42:46.458-06:00'
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
