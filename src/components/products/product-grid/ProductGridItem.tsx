'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/interfaces';
import { currencyFormat } from '@/utils';

interface Props {
	product: Product;
}

export function ProductGridItem({ product }: Props) {
	const [displayImage, setDisplayImage] = useState(product.images[0]);

	const onMouseEnter = () => {
		setDisplayImage(product.images[1]);
	};
	const onMouseLeave = () => {
		setDisplayImage(product.images[0]);
	};

	return (
		<div className='rounded-md overflow-hidden fade-in'>
			<Link href={`/product/${product.slug}`}>
				<Image
					src={`/products/${displayImage}`}
					alt={product.title}
					className='w-full object-cover rounded'
					width={500}
					height={500}
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
				/>
			</Link>
			<div className='p-4 flex flex-col'>
				<Link href={`/product/${product.slug}`} className='hover:text-blue-600'>
					{product.title}
				</Link>
				<span className='font-bold'>{currencyFormat(product.price)}</span>
			</div>
		</div>
	);
}
