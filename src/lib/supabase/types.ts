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
				};
				Insert: {
					createdAt?: string;
					id?: string;
					name: string;
					updatedAt?: string;
				};
				Update: {
					createdAt?: string;
					id?: string;
					name?: string;
					updatedAt?: string;
				};
			};
			cities: {
				Row: {
					country: string;
					createdAt: string | null;
					id: number;
					isCapital: boolean;
					name: string;
				};
				Insert: {
					country: string;
					createdAt?: string | null;
					id?: number;
					isCapital: boolean;
					name: string;
				};
				Update: {
					country?: string;
					createdAt?: string | null;
					id?: number;
					isCapital?: boolean;
					name?: string;
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
