'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';

export function ProductsInCheckout() {
	const [loaded, setLoaded] = useState(false);
	const productsInCart = useCartStore((state) => state.cart);

	useEffect(() => {
		setLoaded(true);
	}, []);

	if (!loaded) return <p>Loading...</p>;

	if (!productsInCart[0] && loaded) redirect('/empty');

	return (
		<>
			{productsInCart.map((product) => (
				<div
					key={`${product.slug}-${product.size}`}
					className='flex mb-2 items-center bg-gray-200 px-2 py-1 rounded'
				>
					<Image
						src={`/products/${product.image}`}
						width={100}
						height={100}
						style={{
							width: '100px',
							height: '100px',
						}}
						alt={product.title}
						className='mr-5 rounded'
					/>
					<div>
						<span>
							{product.size} - {product.title}{' '}
							<strong>({product.quantity})</strong>
						</span>
						<p className='font-bold'>
							{currencyFormat(product.price * product.quantity)}
						</p>
					</div>
				</div>
			))}
		</>
	);
}
