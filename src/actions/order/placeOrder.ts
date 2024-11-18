'use server';

import { auth } from '@/auth.config';
import { Address, Size } from '@/interfaces';
import prisma from '@/lib/prisma';

interface ProductToOrder {
	productId: string;
	quantity: number;
	size: Size;
}

export async function placeOrder(
	productIds: ProductToOrder[],
	address: Address,
) {
	const session = await auth();
	const userId = session?.user.id;

	if (!userId) {
		return {
			ok: false,
			message: 'No hay sesion de usuario',
		};
	}

	const products = await prisma.product.findMany({
		where: { id: { in: productIds.map((item) => item.productId) } },
	});

	const itemsInOrder = productIds.reduce(
		(count, item) => count + item.quantity,
		0,
	);

	const { subtotal, tax, total } = productIds.reduce(
		(count, item) => {
			const productQuantity = item.quantity;
			const product = products.find((product) => product.id === item.productId);
			if (!product) throw new Error(`${item.productId} no existe`);
			const subtotal = product.price * productQuantity;
			count.subtotal += subtotal;
			count.tax += subtotal * 0.15;
			count.total += subtotal * 1.15;
			return count;
		},
		{ subtotal: 0, tax: 0, total: 0 },
	);

	try {
		const prismaTx = await prisma.$transaction(async (tx) => {
			const updatedProductsPromises = products.map(async (item) => {
				const productQuantity = productIds
					.filter((product) => product.productId === item.id)
					.reduce((acc, cur) => cur.quantity + acc, 0);
				if (productQuantity === 0)
					throw new Error(`${item.id} no tiene cantidad definida`);
				return tx.product.update({
					where: { id: item.id },
					data: { inStock: { decrement: productQuantity } },
				});
			});
			const updatedProducts = await Promise.all(updatedProductsPromises);
			updatedProducts.forEach((product) => {
				if (product.inStock < 0)
					throw new Error(`${product.title} no tiene suficiente existencias`);
			});
			const order = await tx.order.create({
				data: {
					userId,
					itemsInOrder,
					subtotal,
					tax,
					total,
					OrderItem: {
						createMany: {
							data: productIds.map((item) => ({
								quantity: item.quantity,
								productId: item.productId,
								size: item.size,
								price:
									products.find((product) => product.id === item.productId)
										?.price ?? 0,
							})),
						},
					},
				},
			});
			const { country, ...restAddress } = address;
			const orderAddress = await tx.orderAddress.create({
				data: {
					...restAddress,
					countryId: country,
					orderId: order.id,
				},
			});
			return {
				order,
				updatedProducts,
				orderAddress,
			};
		});

		return {
			ok: true,
			message: 'Transaccion registrada con exito',
			data: prismaTx,
		};
	} catch (error: any) {
		return {
			ok: false,
			message: 'Transaccion fallida. No registrada',
			error: error?.message,
		};
	}
}
