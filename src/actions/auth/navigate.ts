'use client';

import { useRouter } from 'next/navigation';

export function refreshPage(page: string) {
	const router = useRouter();

	router.replace(page);
	router.refresh();
}
