import Link from 'next/link';
import { titleFont } from '@/config/fonts';

export function Footer() {
	return (
		<div className='flex w-full justify-center text-xs mb-10'>
			<Link href='/'>
				<span className={`${titleFont.className} antialiased font-bold`}>
					Teslo{' '}
				</span>
				<span>| Shop </span>
				<span>© {new Date().getFullYear()}</span>
			</Link>
			<Link href='/' className='mx-3 hover:underline'>
				Privacidad & Legal
			</Link>
			<Link href='/' className='mx-3 hover:underline'>
				Ubicaciones
			</Link>
		</div>
	);
}
