import { goto } from '$app/navigation';
import supabase from '$lib/supabase/client';
import { isUserLoggedIn } from '$store/session';

interface SignInParams {
	readonly email: string;
	readonly password: string;
}

export async function loginWithEmailAndPassword({ email, password }: SignInParams) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password
	});

	const { user } = data;
	if (!user) {
		throw new Error(error?.message);
	}

	localStorage.setItem('userId', user.id);
	isUserLoggedIn.set(true);

	await goto('/');
}
