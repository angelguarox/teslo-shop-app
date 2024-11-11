import { Size } from '@/interfaces';
import clsx from 'clsx';

interface Props {
	selectedSize?: Size;
	availableSize: Size[];
	onSizeChanged: (size: Size) => void;
}

export function SizeSelector({
	selectedSize,
	availableSize,
	onSizeChanged,
}: Props) {
	return (
		<div className='my-5'>
			<h3 className='font-bold mb-4'>Tallas disponibles:</h3>
			<div className='flex'>
				{availableSize.map((size) => (
					<button
						key={size}
						onClick={() => onSizeChanged(size)}
						className={clsx(
							'bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500',
							{
								'bg-blue-100 text-blue-600 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-600 dark:text-white':
									size === selectedSize,
							},
						)}
					>
						{size}
					</button>
				))}
			</div>
		</div>
	);
}
