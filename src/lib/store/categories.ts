import { writable } from 'svelte/store';

import type { Category } from '$models/classes/category';

export const categories = writable<Category[]>([]);
