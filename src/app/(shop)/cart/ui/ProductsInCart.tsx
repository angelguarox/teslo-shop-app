'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/store';
import { QuantitySelector } from '@/components';
import Link from 'next/link';
import { currencyFormat } from '@/utils';

export function ProductsInCart() {
	const [loaded, setLoaded] = useState(false);

	const productsInCart = useCartStore((state) => state.cart);
	const updateProductQuantity = useCartStore(
		(state) => state.updateProductQuantity,
	);
	const removeProduct = useCartStore((state) => state.removeProduct);

	useEffect(() => {
		setLoaded(true);
	}, []);

	if (!loaded) return <p>Loading...</p>;

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
						<Link
							href={`/product/${product.slug}`}
							className='hover:underline font-bold'
						>
							{product.size} - {product.title}
						</Link>
						<p className='font-semibold'>{currencyFormat(product.price)}</p>
						<QuantitySelector
							quantity={product.quantity}
							inStock={product.inStock}
							onQuantityChanched={(quantity) =>
								updateProductQuantity(product, quantity)
							}
						/>
						<button
							className='underline mt-3'
							onClick={() => removeProduct(product)}
						>
							Remover
						</button>
					</div>
				</div>
			))}
		</>
	);
}
