export const revalidate = 604800;

import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { titleFont } from '@/config/fonts';
import { getProductBySlug } from '@/actions';
import {
	ProductMobileSlideshow,
	ProductSlideshow,
	StockLabel,
} from '@/components';
import { AddToCart } from './ui/AddToCart';
import { currencyFormat } from '@/utils';

interface Props {
	params: {
		slug: string;
	};
}

// type Params = Promise<{ slug: string }>;

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const slug = (await params).slug;

	const product = await getProductBySlug(slug);
	// const previousImages = (await parent).openGraph?.images || [];

	return {
		title: product?.title ?? 'Producto no encontrado',
		description: product?.description ?? '',
		openGraph: {
			title: product?.title ?? 'Producto no encontrado',
			description: product?.description ?? '',
			// images: ['/some-specific-page-image.jpg', ...previousImages],
			images: [`/products/${product?.images[1]}`],
		},
	};
}

export default async function ProductPage({ params }: Props) {
	const { slug } = await params;

	const product = await getProductBySlug(slug);

	if (!product) notFound();

	return (
		<div className='mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3'>
			<div className='col-span-1 md:col-span-2'>
				<ProductMobileSlideshow
					images={product.images}
					title={product.title}
					className='block md:hidden'
				/>
				<ProductSlideshow
					images={product.images}
					title={product.title}
					className='hidden md:block'
				/>
			</div>
			<div className='col-span-1 px-5'>
				<h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
					{product.title}
				</h1>
				<p className='text-lg mb-5 font-semibold'>
					{currencyFormat(product.price)}
				</p>
				<StockLabel slug={product.slug} />
				<AddToCart product={product} />
				<h3 className='font-bold text-sm'>Descripción</h3>
				<p className='font-light'>{product.description}</p>
			</div>
		</div>
	);
}
