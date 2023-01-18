export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
	public: {
		Tables: {
			categories: {
				Row: {
					createdAt: string;
					id: string;
					name: string;
					updatedAt: string;
					userId: string;
				};
				Insert: {
					createdAt?: string;
					id?: string;
					name: string;
					updatedAt?: string;
					userId?: string;
				};
				Update: {
					createdAt?: string;
					id?: string;
					name?: string;
					updatedAt?: string;
					userId?: string;
				};
			};
			'frequent-tasks': {
				Row: {
					categoryId: string | null;
					createdAt: string;
					id: string;
					name: string;
					updatedAt: string;
					userId: string;
				};
				Insert: {
					categoryId?: string | null;
					createdAt?: string;
					id?: string;
					name: string;
					updatedAt?: string;
					userId?: string;
				};
				Update: {
					categoryId?: string | null;
					createdAt?: string;
					id?: string;
					name?: string;
					updatedAt?: string;
					userId?: string;
				};
			};
			users: {
				Row: {
					createdAt: string;
					email: string;
					id: string;
					updatedAt: string;
				};
				Insert: {
					createdAt?: string;
					email: string;
					id: string;
					updatedAt?: string;
				};
				Update: {
					createdAt?: string;
					email?: string;
					id?: string;
					updatedAt?: string;
				};
			};
			'work-sessions': {
				Row: {
					categoryId: string | null;
					createdAt: string;
					durationInMinutes: number;
					endTimeInISO: string;
					id: string;
					startedTimeInISO: string;
					taskId: string | null;
					updatedAt: string;
					userId: string;
				};
				Insert: {
					categoryId?: string | null;
					createdAt?: string;
					durationInMinutes: number;
					endTimeInISO: string;
					id?: string;
					startedTimeInISO: string;
					taskId?: string | null;
					updatedAt?: string;
					userId?: string;
				};
				Update: {
					categoryId?: string | null;
					createdAt?: string;
					durationInMinutes?: number;
					endTimeInISO?: string;
					id?: string;
					startedTimeInISO?: string;
					taskId?: string | null;
					updatedAt?: string;
					userId?: string;
				};
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
	};
}
