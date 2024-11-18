import Link from 'next/link';
import { Title } from '@/components';
import { ProductsInCheckout } from './ui/ProductsInCheckout';
import { PlaceOrder } from './ui/PlaceOrder';

export default function CheckoutPage() {
	return (
		<div className='flex justify-center items-center mb-10 px-10 sm:px-0'>
			<div className='flex flex-col w-[1000px]'>
				<Title title='Verificar orden' />
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
					<div className='flex flex-col mt-5'>
						<span className='text-xl'>Ajustar items</span>
						<Link href='/cart' className='underline mb-5'>
							Editar orden
						</Link>
						<ProductsInCheckout />
					</div>
					<PlaceOrder />
				</div>
			</div>
		</div>
	);
}
