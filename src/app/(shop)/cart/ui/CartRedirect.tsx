'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store';

export function CartRedirect() {
	const router = useRouter();
	const itemsInCart = useCartStore((state) => state.cartSummary.itemsInCart);

	useEffect(() => {
		if (itemsInCart === 0) {
			router.replace('/empty');
		}
	}, [itemsInCart, router]);

	return null;
}
