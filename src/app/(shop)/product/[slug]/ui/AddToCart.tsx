'use client';

import { useState } from 'react';
import { QuantitySelector, SizeSelector } from '@/components';
import { CartProduct, Product, Size } from '@/interfaces';
import { useCartStore } from '@/store';

interface Props {
	product: Product;
}

export function AddToCart({ product }: Props) {
	const [selectedSize, setSelectedSize] = useState<Size | undefined>();
	const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
	const [posted, setPosted] = useState<boolean>(false);

	const addProductToCart = useCartStore((state) => state.addProductToCart);

	const addToCart = () => {
		setPosted(true);

		if (!selectedSize) return;

		const cartProduct: CartProduct = {
			id: product.id,
			title: product.title,
			slug: product.slug,
			price: product.price,
			quantity: selectedQuantity,
			size: selectedSize!,
			image: product.images[0],
			inStock: product.inStock,
		};

		addProductToCart(cartProduct);
		setPosted(false);
		setSelectedQuantity(1);
		setSelectedSize(undefined);
	};

	return (
		<>
			<SizeSelector
				availableSize={product.sizes}
				selectedSize={selectedSize}
				onSizeChanged={setSelectedSize}
			/>
			{posted && !selectedSize && (
				<div
					className='bg-red-100 border-l-4 border-red-500 text-red-700 p-1 mb-4 fade-in'
					role='alert'
				>
					<p className='text-sm font-bold'>Debe de seleccionar una talla!</p>
				</div>
			)}
			<QuantitySelector
				quantity={selectedQuantity}
				inStock={product.inStock}
				onQuantityChanched={setSelectedQuantity}
			/>
			<button className='btn-primary my-5' onClick={addToCart}>
				Agregar al carrito
			</button>
		</>
	);
}
