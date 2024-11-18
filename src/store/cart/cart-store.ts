import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartProduct } from '@/interfaces';

interface CartSummary {
	itemsInCart: number;
	subtotal: number;
	tax: number;
	total: number;
}

interface State {
	cart: CartProduct[];
	cartSummary: CartSummary;
	addProductToCart: (product: CartProduct) => void;
	updateProductQuantity: (product: CartProduct, quantity: number) => void;
	removeProduct: (product: CartProduct) => void;
	calculateCartSummary: () => void;
	clearCart: () => void;
}

export const useCartStore = create<State>()(
	persist(
		(set, get) => ({
			cart: [],
			cartSummary: {
				itemsInCart: 0,
				subtotal: 0,
				tax: 0,
				total: 0,
			},
			// Recalcula `cartSummary` cuando el carrito cambia
			calculateCartSummary: () => {
				const { cart } = get();
				const itemsInCart = cart.reduce(
					(total, item) => total + item.quantity,
					0,
				);
				const subtotal = cart.reduce(
					(subtotal, product) => product.quantity * product.price + subtotal,
					0,
				);
				const tax = subtotal * 0.15;
				const total = subtotal + tax;

				set({
					cartSummary: {
						itemsInCart,
						subtotal,
						tax,
						total,
					},
				});
			},
			addProductToCart: (product: CartProduct) => {
				const { cart } = get();
				const productInCart = cart.some(
					(item) => item.id === product.id && item.size === product.size,
				);

				if (!productInCart) {
					set({ cart: [...cart, product] });
				} else {
					const updatedCartProducts = cart.map((item) => {
						if (item.id === product.id && item.size === product.size) {
							return { ...item, quantity: item.quantity + product.quantity };
						}
						return item;
					});
					set({ cart: updatedCartProducts });
				}
				get().calculateCartSummary();
			},
			updateProductQuantity: (product: CartProduct, quantity: number) => {
				const { cart } = get();
				const updatedCartProducts = cart.map((item) => {
					if (item.id === product.id && item.size === product.size) {
						return { ...item, quantity };
					}
					return item;
				});
				set({ cart: updatedCartProducts });
				get().calculateCartSummary();
			},
			removeProduct: (product: CartProduct) => {
				const { cart } = get();
				const removedCartProduct = cart.filter(
					(item) => item.id !== product.id || item.size !== product.size,
				);
				set({ cart: removedCartProduct });
				get().calculateCartSummary();
			},
			clearCart: () => {
				set({ cart: [] });
				get().calculateCartSummary();
			},
		}),
		{
			name: 'shopping-cart',
		},
	),
);
