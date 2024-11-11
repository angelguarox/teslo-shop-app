export const revalidate = 60;

import { redirect } from 'next/navigation';
import { Pagination, ProductGrid, Title } from '@/components';
import { getPaginatedProductsWithImages } from '@/actions';
import { Gender } from '@prisma/client';

interface Props {
	params: {
		gender: string;
	};
	searchParams: {
		page?: string;
	};
}

// type Params = Promise<{ gender: string }>;
// type SearchParams = Promise<{ page?: string }>;

export default async function GenderPage({ params, searchParams }: Props) {
	const { gender } = await params;
	const mySearchParams = await searchParams;
	const page = mySearchParams.page ? parseInt(mySearchParams.page) : 1;

	const { products, totalPages } = await getPaginatedProductsWithImages({
		page,
		gender: gender as Gender,
	});

	if (products.length === 0) redirect(`/gender/${gender}`);

	const labels: Record<string, string> = {
		men: 'Hombres',
		women: 'Mujeres',
		kid: 'Niños',
		unisex: 'Todos',
	};

	return (
		<>
			<Title
				title={`Productos para ${labels[gender]}`}
				subtitle='Todos los productos'
				className='mb-2'
			/>
			<ProductGrid products={products} />

			<Pagination totalPages={totalPages} />
		</>
	);
}
