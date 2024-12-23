import type { Metadata } from 'next';
import { roboto } from '@/config/fonts';
import { ProviderSession } from '@/components';
import './globals.css';

export const metadata: Metadata = {
	title: {
		template: '%s - Teslo | Shop',
		default: 'Home - Teslo | Shop',
	},
	description: 'A virtual product store',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='es'>
			<body className={roboto.className}>
				<ProviderSession>{children}</ProviderSession>
			</body>
		</html>
	);
}
