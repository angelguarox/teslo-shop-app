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
