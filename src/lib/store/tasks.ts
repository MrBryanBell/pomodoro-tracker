import { writable } from 'svelte/store';

import type { Task } from '$lib/models/classes/task';

export const tasks = writable<Task[]>([]);
