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
					user_id: string;
				};
				Insert: {
					createdAt?: string;
					id?: string;
					name: string;
					updatedAt?: string;
					user_id?: string;
				};
				Update: {
					createdAt?: string;
					id?: string;
					name?: string;
					updatedAt?: string;
					user_id?: string;
				};
			};
			cities: {
				Row: {
					country: string;
					createdAt: string | null;
					id: number;
					is_public: boolean;
					isCapital: boolean;
					name: string;
					user_id: string | null;
				};
				Insert: {
					country: string;
					createdAt?: string | null;
					id?: number;
					is_public?: boolean;
					isCapital: boolean;
					name: string;
					user_id?: string | null;
				};
				Update: {
					country?: string;
					createdAt?: string | null;
					id?: number;
					is_public?: boolean;
					isCapital?: boolean;
					name?: string;
					user_id?: string | null;
				};
			};
			tasks: {
				Row: {
					category: string;
					created_at: string;
					id: string;
					name: string;
					updated_at: string;
				};
				Insert: {
					category: string;
					created_at?: string;
					id?: string;
					name: string;
					updated_at?: string;
				};
				Update: {
					category?: string;
					created_at?: string;
					id?: string;
					name?: string;
					updated_at?: string;
				};
			};
			users: {
				Row: {
					createdAt: string;
					email: string;
					id: string;
				};
				Insert: {
					createdAt?: string;
					email: string;
					id: string;
				};
				Update: {
					createdAt?: string;
					email?: string;
					id?: string;
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
