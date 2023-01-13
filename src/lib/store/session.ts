import { writable } from 'svelte/store';

export const isUserLoggedIn = writable<boolean | null>(null, (set) => {
	const userId = localStorage.getItem('userId');

	userId ? set(true) : set(false);

	return function stop() {
		console.log('Todos Store Stopped');
	};
});
