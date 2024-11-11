'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
	IoCloseOutline,
	IoLogInOutline,
	IoLogOutOutline,
	IoPeopleOutline,
	IoPersonOutline,
	IoSearchOutline,
	IoShirtOutline,
	IoTicketOutline,
} from 'react-icons/io5';
import clsx from 'clsx';
import { useUIStore } from '@/store';

export function Sidebar() {
	const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
	const closeMenu = useUIStore((state) => state.closeSideMenu);

	const { data: session } = useSession();
	const router = useRouter();

	const logoutCloseSidebar = async () => {
		closeMenu();
		await signOut({ redirect: false });
		router.replace('/');
	};

	return (
		<div>
			{isSideMenuOpen && (
				<div className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30' />
			)}
			{isSideMenuOpen && (
				<div
					className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'
					onClick={closeMenu}
				/>
			)}
			<nav
				className={clsx(
					'fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
					{
						'translate-x-full': !isSideMenuOpen,
					},
				)}
			>
				<IoCloseOutline
					size={50}
					className='absolute top-5 right-5 cursor-pointer'
					onClick={closeMenu}
				/>
				<div className='relative mt-14'>
					<IoSearchOutline size={20} className='absolute top-2 left-2' />
					<input
						type='text'
						placeholder='Buscar...'
						className='w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500'
					/>
				</div>
				<div className='mt-10'>
					{session?.user && (
						<>
							<Link
								href='/profile'
								onClick={closeMenu}
								className='flex items-center my-4 p-2 hover:bg-gray-100 rounded transition-all'
							>
								<IoPersonOutline size={30} />
								<span className='ml-3 text-xl'>Perfil</span>
							</Link>
							<Link
								href='/'
								className='flex items-center my-4 p-2 hover:bg-gray-100 rounded transition-all'
							>
								<IoTicketOutline size={30} />
								<span className='ml-3 text-xl'>Ordenes</span>
							</Link>
						</>
					)}
					{session?.user ? (
						<button
							onClick={logoutCloseSidebar}
							className='flex w-full items-center my-4 p-2 hover:bg-gray-100 rounded transition-all'
						>
							<IoLogOutOutline size={30} />
							<span className='ml-3 text-xl'>Salir</span>
						</button>
					) : (
						<Link
							href='/auth/login'
							onClick={closeMenu}
							className='flex items-center my-4 p-2 hover:bg-gray-100 rounded transition-all'
						>
							<IoLogInOutline size={30} />
							<span className='ml-3 text-xl'>Ingresar</span>
						</Link>
					)}
				</div>
				{session?.user.role === 'admin' && (
					<>
						<div className='w-full h-px bg-gray-200'></div>
						<div className='mt-10'>
							<Link
								href='/'
								className='flex items-center my-4 p-2 hover:bg-gray-100 rounded transition-all'
							>
								<IoShirtOutline size={30} />
								<span className='ml-3 text-xl'>Productos</span>
							</Link>
							<Link
								href='/'
								className='flex items-center my-4 p-2 hover:bg-gray-100 rounded transition-all'
							>
								<IoTicketOutline size={30} />
								<span className='ml-3 text-xl'>Ordenes</span>
							</Link>
							<Link
								href='/'
								className='flex items-center my-4 p-2 hover:bg-gray-100 rounded transition-all'
							>
								<IoPeopleOutline size={30} />
								<span className='ml-3 text-xl'>Usuarios</span>
							</Link>
						</div>
					</>
				)}
			</nav>
		</div>
	);
}

/* 'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
	IoCloseOutline,
	IoLogInOutline,
	IoLogOutOutline,
	IoPeopleOutline,
	IoPersonOutline,
	IoSearchOutline,
	IoShirtOutline,
	IoTicketOutline,
} from 'react-icons/io5';
import clsx from 'clsx';
import { useUIStore } from '@/store';
import { logout } from '@/actions';

export function Sidebar() {
	const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
	const closeMenu = useUIStore((state) => state.closeSideMenu);

	const { data: session, status } = useSession();
	const isAuthenticated = !!session?.user;

	console.log({ isAuthenticated, status });

	const logoutCloseSidebar = () => {
		closeMenu();
		logout();
	};

	return (
		<div>
			{isSideMenuOpen && (
				<div className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30' />
			)}
			{isSideMenuOpen && (
				<div
					className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'
					onClick={closeMenu}
				/>
			)}
			<nav
				className={clsx(
					'fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
					{
						'translate-x-full': !isSideMenuOpen,
					},
				)}
			>
				<IoCloseOutline
					size={50}
					className='absolute top-5 right-5 cursor-pointer'
					onClick={closeMenu}
				/>
				<div className='relative mt-14'>
					<IoSearchOutline size={20} className='absolute top-2 left-2' />
					<input
						type='text'
						placeholder='Buscar...'
						className='w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500'
					/>
				</div>
				<div className='mt-10'>
					<Link
						href='/profile'
						onClick={closeMenu}
						className='flex items-center my-4 p-2 hover:bg-gray-100 rounded transition-all'
					>
						<IoPersonOutline size={30} />
						<span className='ml-3 text-xl'>Perfil</span>
					</Link>
					<Link
						href='/'
						className='flex items-center my-4 p-2 hover:bg-gray-100 rounded transition-all'
					>
						<IoTicketOutline size={30} />
						<span className='ml-3 text-xl'>Ordenes</span>
					</Link>
					{isAuthenticated && (
						<button
							onClick={logoutCloseSidebar}
							className='flex w-full items-center my-4 p-2 hover:bg-gray-100 rounded transition-all'
						>
							<IoLogOutOutline size={30} />
							<span className='ml-3 text-xl'>Salir</span>
						</button>
					)}
					{!isAuthenticated && (
						<Link
							href='/auth/login'
							onClick={closeMenu}
							className='flex items-center my-4 p-2 hover:bg-gray-100 rounded transition-all'
						>
							<IoLogInOutline size={30} />
							<span className='ml-3 text-xl'>Ingresar</span>
						</Link>
					)}
				</div>
				<div className='w-full h-px bg-gray-200'></div>
				<div className='mt-10'>
					<Link
						href='/'
						className='flex items-center my-4 p-2 hover:bg-gray-100 rounded transition-all'
					>
						<IoShirtOutline size={30} />
						<span className='ml-3 text-xl'>Productos</span>
					</Link>
					<Link
						href='/'
						className='flex items-center my-4 p-2 hover:bg-gray-100 rounded transition-all'
					>
						<IoTicketOutline size={30} />
						<span className='ml-3 text-xl'>Ordenes</span>
					</Link>
					<Link
						href='/'
						className='flex items-center my-4 p-2 hover:bg-gray-100 rounded transition-all'
					>
						<IoPeopleOutline size={30} />
						<span className='ml-3 text-xl'>Usuarios</span>
					</Link>
				</div>
			</nav>
		</div>
	);
}
 */
