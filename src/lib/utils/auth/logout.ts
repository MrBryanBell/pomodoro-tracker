import { goto } from '$app/navigation';
import supabase from '$lib/supabase/client';
import { isUserLoggedIn } from '$store/session';

export async function logout() {
	const { error } = await supabase.auth.signOut();
	if (error) {
		throw new Error(error.message);
	}
	localStorage.removeItem('userId');
	isUserLoggedIn.set(false);

	await goto('/login');
}
