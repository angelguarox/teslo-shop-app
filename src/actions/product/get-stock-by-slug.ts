import prisma from '@/lib/prisma';

export async function getStockBySlug(slug: string): Promise<number> {
	try {
		const stock = await prisma.product.findFirst({
			where: { slug },
			select: { inStock: true },
		});

		return stock?.inStock ?? 0;
	} catch (error) {
		throw new Error('Error al obtener stock por slug');
	}
}
