'use server';

import { Address } from '@/interfaces';
import prisma from '@/lib/prisma';

export async function setUserAddress(address: Address, userId: string) {
	try {
		const savedAddress = await createOrReplaceAddress(address, userId);

		return {
			ok: true,
			message: 'Dirección registrada exitosamente',
			data: savedAddress,
		};
	} catch (error) {
		return {
			ok: false,
			message: 'No se pudo grabar la dirección',
		};
	}
}

async function createOrReplaceAddress(address: Address, userId: string) {
	try {
		const storedAddress = await prisma.userAddress.findUnique({
			where: { userId },
		});

		const addressToSave = {
			userId,
			address: address.address,
			address2: address.address2,
			countryId: address.country,
			firstName: address.firstName,
			lastName: address.lastName,
			phone: address.phone,
			postalCode: address.postalCode,
			city: address.city,
		};

		if (!storedAddress) {
			const newAddress = await prisma.userAddress.create({
				data: addressToSave,
			});

			return newAddress;
		}

		const updatedAddress = await prisma.userAddress.update({
			where: { userId },
			data: addressToSave,
		});

		return updatedAddress;
	} catch (error) {
		throw new Error('No se pudo grabar la dirección');
	}
}
