import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { IoArrowBack, IoCartOutline } from 'react-icons/io5';
import { Title } from '@/components';
import { initialData } from '@/seed/seed';

interface Props {
	params: {
		id: string;
	};
}

// type Params = Promise<{ id: string }>;

const productsInCart = [
	initialData.products[0],
	initialData.products[1],
	initialData.products[2],
];

export default async function OrderPage({ params }: Props) {
	const { id } = await params;

	return (
		<>
			<Link
				href='/orders'
				className='flex flex-row items-center gap-2 btn-secondary w-52'
			>
				<IoArrowBack size={20} />
				<p className=''>Todas las ordenes</p>
			</Link>
			<div className='flex justify-center items-center mb-10 px-10 sm:px-0'>
				<div className='flex flex-col w-[1000px]'>
					<Title title={`Orden #${id}`} />
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
						<div className='flex flex-col mt-5'>
							<div
								className={clsx(
									'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
									{
										'bg-red-500': false,
										'bg-green-700': true,
									},
								)}
							>
								<IoCartOutline size={30} />
								{/* <span className='mx-2'>Pendiente</span> */}
								<span className='mx-2'>Pagada</span>
							</div>
							{productsInCart.map((product) => (
								<div
									key={product.slug}
									className='flex mb-2 items-center bg-gray-200 px-2 py-1 rounded'
								>
									<Image
										src={`/products/${product.images[0]}`}
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
										<p className='font-bold'>{product.title}</p>
										<p className='font-semibold'>${product.price} x 3</p>
										<p className='font-bold'>Subtotal: ${product.price * 3}</p>
									</div>
								</div>
							))}
						</div>
						<div className='bg-white rounded-xl shadow-xl p-7'>
							<h2 className='text-2xl mb-2 font-semibold'>
								Dirección de entrega
							</h2>
							<div className='mb-5'>
								<p>Angel Rodriguez</p>
								<p>Calle principal #2</p>
								<p>Barrio La Victoria</p>
								<p>3001</p>
								<p>Barquisimeto</p>
								<p>Venezuela</p>
								<p>04246439445</p>
							</div>
							<div className='w-full h-0.5 rounded bg-gray-200 mb-5' />
							<h2 className='text-2xl mb-2 font-semibold'>
								Resumen de la orden
							</h2>
							<div className='grid grid-cols-2'>
								<span>Nro. de artículos</span>
								<span className='text-right'>3 artículos</span>
								<span>Subtotal</span>
								<span className='text-right'>$100</span>
								<span>Impuestos (15%)</span>
								<span className='text-right'>$50</span>
								<span className='mt-5 text-2xl font-bold'>Total</span>
								<span className='mt-5 text-2xl font-bold text-right'>$150</span>
							</div>
							<div className='mt-5 mb-2 w-full'>
								<div
									className={clsx(
										'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
										{
											'bg-red-500': false,
											'bg-green-700': true,
										},
									)}
								>
									<IoCartOutline size={30} />
									{/* <span className='mx-2'>Pendiente</span> */}
									<span className='mx-2'>Pagada</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
