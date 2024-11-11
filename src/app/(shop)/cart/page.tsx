import Link from 'next/link';
import { Title } from '@/components';
import { ProductsInCart } from './ui/ProductsInCart';
import { OrderSummary } from './ui/OrderSummary';
import { CartRedirect } from './ui/CartRedirect';

export default function CartPage() {
	return (
		<div className='flex justify-center items-center mb-10 px-10 sm:px-0'>
			<CartRedirect />
			<div className='flex flex-col w-[1000px]'>
				<Title title='Carrito de compras' />
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-10 items-center'>
					<div className='flex flex-col mt-5'>
						<span className='text-xl'>Agregar más items</span>
						<Link href='/' className='underline mb-5'>
							Continúa comprando
						</Link>
						<ProductsInCart />
					</div>
					<div className='bg-white rounded-xl shadow-xl p-7 h-fit'>
						<h2 className='text-2xl mb-2 font-semibold'>Resumen de la orden</h2>
						<OrderSummary />
						<div className='mt-5 mb-2 w-full'>
							<Link
								href='/checkout/address'
								className='flex btn-primary justify-center'
							>
								Checkout
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
