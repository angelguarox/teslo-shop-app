'use server';

import { AuthError } from 'next-auth';
import { signIn } from '@/auth.config';

export async function authenticate(
	prevState: string | undefined,
	formData: FormData,
) {
	try {
		await signIn('credentials', {
			...Object.fromEntries(formData),
			redirect: false,
		});
		return 'Success';
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return 'Credenciales inválidas';
				default:
					return 'Algo salió mal';
			}
		}
		throw error;
	}
}

export async function login(email: string, password: string) {
	try {
		await signIn('credentials', { email, password });

		return {
			ok: true,
			message: 'Success',
		};
	} catch (error) {
		return {
			ok: false,
			message: 'No se pudo iniciar sesión',
		};
	}
}
