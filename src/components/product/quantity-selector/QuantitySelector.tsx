import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props {
	quantity: number;
	inStock: number;
	onQuantityChanched: (value: number) => void;
}

export function QuantitySelector({
	quantity,
	inStock,
	onQuantityChanched,
}: Props) {
	const onValueChanged = (value: number) => {
		if (quantity + value < 1) return;
		if (quantity + value > inStock) return;
		onQuantityChanched(quantity + value);
	};

	return (
		<div className='flex'>
			<button onClick={() => onValueChanged(-1)}>
				<IoRemoveCircleOutline size={30} />
			</button>
			<span className='w-20 mx-3 px-5 bg-gray-200 text-center rounded'>
				{quantity}
			</span>
			<button onClick={() => onValueChanged(+1)}>
				<IoAddCircleOutline size={30} />
			</button>
		</div>
	);
}
