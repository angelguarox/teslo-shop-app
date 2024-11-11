'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';

export function OrderSummary() {
	const [loaded, setLoaded] = useState(false);

	const { itemsInCart, subtotal, tax, total } = useCartStore(
		(state) => state.cartSummary,
	);

	useEffect(() => {
		setLoaded(true);
	}, []);

	if (!loaded) return <p>Loading...</p>;

	return (
		<div className='grid grid-cols-2'>
			<span>Nro. de artículos</span>
			<span className='text-right'>
				{itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`}
			</span>
			<span>Subtotal</span>
			<span className='text-right'>{currencyFormat(subtotal)}</span>
			<span>Impuestos (15%)</span>
			<span className='text-right'>{currencyFormat(tax)}</span>
			<span className='mt-5 text-2xl font-bold'>Total</span>
			<span className='mt-5 text-2xl font-bold text-right'>
				{currencyFormat(total)}
			</span>
		</div>
	);
}
