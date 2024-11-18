'use server';

import prisma from '@/lib/prisma';

export async function deleteUserAddress(userId: string) {
	try {
		await prisma.userAddress.delete({
			where: { userId },
		});

		return {
			ok: true,
			message: 'Dirección eliminada exitosamente',
		};
	} catch (error) {
		return {
			ok: false,
			message: 'Error al borrar dirección',
		};
	}
}
