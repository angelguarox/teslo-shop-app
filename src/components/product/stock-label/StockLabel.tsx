import { getStockBySlug } from '@/actions';

interface Props {
	slug: string;
}

export async function StockLabel({ slug }: Props) {
	const inStock = await getStockBySlug(slug);

	return <p className='font-bold mb-2'>Cantidad disponible: {inStock}</p>;
}
