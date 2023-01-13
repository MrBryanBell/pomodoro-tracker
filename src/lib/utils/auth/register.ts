import type { User } from '@supabase/supabase-js';

import { goto } from '$app/navigation';
import supabase from '$lib/supabase/client';
import { isUserLoggedIn } from '$store/session';

interface RegisterUserParams {
	email: string;
	password: string;
}

export async function registerUser({ email, password }: RegisterUserParams) {
	const isEmailRegistered = await checkIfEmailIsRegistered(email);
	if (isEmailRegistered) {
		throw new Error('Email is already registered, please login');
		// TODO: Add a link to the login page
	}

	const { data, error } = await createUser(email, password);
	const { user } = data;
	if (!user) {
		throw new Error(error?.message);
	}

	localStorage.setItem('userId', user.id);
	isUserLoggedIn.set(true);

	await addUserDataToDatabase(user);
	await goto('/');
}

async function checkIfEmailIsRegistered(email: string) {
	const { data } = await supabase.from('users').select('*').eq('email', email);

	return data?.length === 1;
}

async function createUser(email: string, password: string) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password
	});

	return { data, error };
}

async function addUserDataToDatabase({ id, email }: User) {
	if (!email) {
		throw new Error('Email is missing');
	}
	const { data, error } = await supabase.from('users').insert({ id, email });

	return { data, error };
}
