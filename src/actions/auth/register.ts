'use server';

import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { capitalizeWord } from '@/utils';

export async function registerUser(
	name: string,
	email: string,
	password: string,
) {
	try {
		if (!name || !email || !password) {
			return {
				ok: false,
				message: 'Todos los campos son obligatorios',
			};
		}

		const user = await prisma.user.create({
			data: {
				name: capitalizeWord(name),
				email: email.toLowerCase(),
				password: bcrypt.hashSync(password),
			},
			select: {
				id: true,
				name: true,
				email: true,
			},
		});

		return {
			ok: true,
			message: 'Usuario creado exitosamente',
			user: user,
		};
	} catch (error) {
		return {
			ok: false,
			message: 'Error al crear el usuario',
		};
	}
}
