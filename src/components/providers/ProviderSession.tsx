'use client';

import { SessionProvider } from 'next-auth/react';

interface Props {
	children: React.ReactNode;
}

export function ProviderSession({ children }: Props) {
	return <SessionProvider>{children}</SessionProvider>;
}
