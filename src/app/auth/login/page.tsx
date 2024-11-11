import { titleFont } from '@/config/fonts';
import { LoginForm } from './ui/LoginForm';

export default function Login() {
	return (
		<div className='flex flex-col min-h-screen pt-32 sm:pt-52'>
			<h1 className={`${titleFont.className} antialiased text-4xl mb-5`}>
				Ingresar
			</h1>
			<LoginForm />
		</div>
	);
}