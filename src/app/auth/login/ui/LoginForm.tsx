'use client';

import { useActionState, useEffect } from 'react';
import Link from 'next/link';
import { IoInformationCircleOutline } from 'react-icons/io5';
import clsx from 'clsx';
import { authenticate } from '@/actions';

interface Props {
	isPending: boolean;
}

function Button({ isPending }: Props) {
	return (
		<button
			type='submit'
			className={clsx({
				'btn-primary': !isPending,
				'btn-disabled': isPending,
			})}
			disabled={isPending}
		>
			Iniciar sesión
		</button>
	);
}

export function LoginForm() {
	const [errorMessage, formAction, isPending] = useActionState(
		authenticate,
		undefined,
	);

	useEffect(() => {
		if (errorMessage === 'Success') {
			window.location.replace('/');
		}
	}, [errorMessage]);

	return (
		<form action={formAction} className='flex flex-col'>
			<label htmlFor='email'>Correo electrónico</label>
			<input
				type='email'
				name='email'
				autoFocus
				className='px-5 py-2 bg-gray-200 rounded mb-5 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500'
			/>
			<label htmlFor='password'>Contraseña</label>
			<input
				type='password'
				name='password'
				className='px-5 py-2 bg-gray-200 rounded mb-3 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500'
			/>

			<div className='mb-2 h-8' aria-live='polite' aria-atomic='true'>
				{errorMessage === 'Credenciales inválidas' && (
					<div
						className='flex flex-row gap-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1 w-full fade-in'
						role='alert'
					>
						<IoInformationCircleOutline size={20} className='text-red-500' />
						<p className='text-sm font-bold'>{errorMessage}</p>
					</div>
				)}
			</div>

			<Button isPending={isPending} />

			<div className='flex items-center my-5'>
				<div className='flex-1 border-t border-gray-500'></div>
				<div className='px-2 text-gray-800'>O</div>
				<div className='flex-1 border-t border-gray-500'></div>
			</div>
			<Link href='/auth/new-account' className='btn-secondary text-center'>
				Crear una nueva cuenta
			</Link>
		</form>
	);
}
