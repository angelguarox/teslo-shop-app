'use client';

import { useState } from 'react';
import { registerUser } from '@/actions';
import clsx from 'clsx';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoAlertCircleOutline } from 'react-icons/io5';

type FormInputs = {
	name: string;
	email: string;
	password: string;
};

export function RegisterForm() {
	const [errorMessage, setErrorMessage] = useState('');
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormInputs>();

	const onSubmit: SubmitHandler<FormInputs> = async (data) => {
		setErrorMessage('');

		const { name, email, password } = data;
		const response = await registerUser(name, email, password);

		if (!response.ok) {
			setErrorMessage(response.message);
			return;
		}

		console.log(response.user);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
			<label htmlFor='email'>Nombre completo</label>
			<input
				type='text'
				autoFocus
				className={clsx(
					'px-5 py-2 bg-gray-200 rounded mb-1 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500',
					{
						'border-red-500': errors.name,
					},
				)}
				{...register('name', {
					required: 'Este campo es requerido',
				})}
			/>
			<span className='h-4'>
				{errors.name && (
					<div className='flex flex-row justify-center items-center gap-2'>
						<IoAlertCircleOutline color='#ef4444' size={14} />
						<p className='text-xs font-bold text-red-500'>
							{errors.name.message}
						</p>
					</div>
				)}
			</span>
			<label htmlFor='email'>Correo electrónico</label>
			<input
				type='email'
				className={clsx(
					'px-5 py-2 bg-gray-200 rounded mb-1 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500',
					{
						'border-red-500': errors.email,
					},
				)}
				{...register('email', {
					required: 'Este campo es requerido',
					pattern: {
						value: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
						message: 'Debe contener elementos de un correo',
					},
				})}
			/>
			<span className='h-4'>
				{errors.email && (
					<div className='flex flex-row justify-center items-center gap-2'>
						<IoAlertCircleOutline color='#ef4444' size={14} />
						<p className='text-xs font-bold text-red-500'>
							{errors.email.message}
						</p>
					</div>
				)}
			</span>
			<label htmlFor='password'>Contraseña</label>
			<input
				type='password'
				className={clsx(
					'px-5 py-2 bg-gray-200 rounded mb-1 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500',
					{
						'border-red-500': errors.password,
					},
				)}
				{...register('password', {
					required: 'Este campo es requerido',
					minLength: {
						value: 6,
						message: 'Debe conterner 6 caracteres como minimo',
					},
					maxLength: {
						value: 20,
						message: 'Debe conterner 20 caracteres como maximo',
					},
				})}
			/>
			<span className='h-4'>
				{errors.password && (
					<div className='flex flex-row justify-center items-center gap-2'>
						<IoAlertCircleOutline color='#ef4444' size={14} />
						<p className='text-xs font-bold text-red-500'>
							{errors.password.message}
						</p>
					</div>
				)}
			</span>

			<div className='mb-4 h-8' aria-live='polite' aria-atomic='true'>
				{errorMessage && (
					<div
						className='flex flex-row gap-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-1 w-full fade-in'
						role='alert'
					>
						<IoAlertCircleOutline size={20} className='text-red-500' />
						<p className='text-sm font-bold'>{errorMessage}</p>
					</div>
				)}
			</div>

			<button className='btn-primary mt-4'>Crear cuenta</button>
			<div className='flex items-center my-5'>
				<div className='flex-1 border-t border-gray-500'></div>
				<div className='px-2 text-gray-800'>O</div>
				<div className='flex-1 border-t border-gray-500'></div>
			</div>
			<Link href='/auth/login' className='btn-secondary text-center'>
				Ingresar
			</Link>
		</form>
	);
}
