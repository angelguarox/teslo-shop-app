'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoAlertCircleOutline } from 'react-icons/io5';
import clsx from 'clsx';
import { useAddressStore, useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import { placeOrder } from '@/actions';

export function PlaceOrder() {
	const router = useRouter();
	const [loaded, setLoaded] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const storedAddress = useAddressStore((state) => state.address);
	const cart = useCartStore((state) => state.cart);
	const { itemsInCart, subtotal, tax, total } = useCartStore(
		(state) => state.cartSummary,
	);
	const clearCart = useCartStore((state) => state.clearCart);

	const onPlaceOrder = async () => {
		setIsPending(true);

		const productsToOrder = cart.map((item) => ({
			productId: item.id,
			quantity: item.quantity,
			size: item.size,
		}));

		const response = await placeOrder(productsToOrder, storedAddress);

		if (!response.ok) {
			setIsPending(false);
			setErrorMessage(response.error);
			return;
		}

		clearCart();
		router.replace(`/orders/${response.data?.order.id}`);
	};

	useEffect(() => {
		setLoaded(true);
	}, []);

	if (!loaded) return <p>Loading...</p>;

	return (
		<div className='bg-white rounded-xl shadow-xl p-7'>
			<h2 className='text-2xl mb-2 font-semibold'>Dirección de entrega</h2>
			<div className='mb-5'>
				<p>
					{storedAddress.firstName} {storedAddress.lastName}
				</p>
				<p>{storedAddress.address}</p>
				<p>{storedAddress.address2}</p>
				<p>{storedAddress.postalCode}</p>
				<p>
					{storedAddress.city} {storedAddress.country}
				</p>
				<p>{storedAddress.phone}</p>
			</div>
			<div className='w-full h-0.5 rounded bg-gray-200 mb-5' />
			<h2 className='text-2xl mb-2 font-semibold'>Resumen de la orden</h2>
			<div className='grid grid-cols-2'>
				<span>Nro. de artículos</span>
				<span className='text-right'>{itemsInCart} artículos</span>
				<span>Subtotal</span>
				<span className='text-right'>{currencyFormat(subtotal)}</span>
				<span>Impuestos (15%)</span>
				<span className='text-right'>{currencyFormat(tax)}</span>
				<span className='mt-5 text-2xl font-bold'>Total</span>
				<span className='mt-5 text-2xl font-bold text-right'>
					{currencyFormat(total)}
				</span>
			</div>
			<div className='mt-5 mb-2 w-full'>
				<p className='mb-5'>
					<span className='text-xs'>
						Al hacer click en &quot;Colocar orden&quot;, acepta nuestros{' '}
						<a href='#' className='underline'>
							términos y condiciones de uso
						</a>{' '}
						y{' '}
						<a href='#' className='underline'>
							políticas de privacidad
						</a>
						.
					</span>
				</p>

				<div className='mb-4 h-8' aria-live='polite' aria-atomic='true'>
					{errorMessage && (
						<div
							className='flex flex-row gap-2 border-l-4 border-red-500 text-red-700 bg-red-100 p-1 w-full fade-in'
							role='alert'
						>
							<IoAlertCircleOutline size={20} className='text-red-500' />
							<p className='text-sm font-bold'>{errorMessage}</p>
						</div>
					)}
				</div>

				<button
					className={clsx('flex w-full justify-center', {
						'btn-primary': !isPending,
						'btn-disabled': isPending,
					})}
					disabled={isPending}
					onClick={onPlaceOrder}
				>
					Colocar orden
				</button>
			</div>
		</div>
	);
}
