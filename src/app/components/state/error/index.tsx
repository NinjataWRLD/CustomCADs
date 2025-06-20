import React from 'react';
import { Link } from '@tanstack/react-router';
import Transition from '../../transition';
import { useErrorTranslation } from '@/hooks/locales/common/state';
import { AppErrorFields } from '@/types/errors';

interface ErrorPageProps {
	status: 400 | 401 | 403 | 404 | null;
	error?: AppErrorFields;
}

const ErrorPage = ({ status, error }: ErrorPageProps) => {
	const tError = useErrorTranslation();
	const { title, message, tip } = error ?? {
		title: tError(`${status ?? 'default'}_title`),
		message: tError(`${status ?? 'default'}_message`),
		tip: tError(`${status ?? 'default'}_tip`),
	};

	return (
		<Transition>
			<div className='flex flex-col justify-center items-center h-screen text-white'>
				<h1 className='text-[3.5rem] font-bold text-gray-300 mb-4'>
					{title}
				</h1>
				<h3 className='text-[1.5rem] text-gray-400 mb-[1rem]'>
					{message}
				</h3>
				<p className='text-[1rem] text-gray-500 mb-[1.5rem]'>{tip}</p>

				{status === 401 && (
					<div className='text-lg'>
						<Link
							to='/login'
							className='text-indigo-300 hover:text-white transition-colors duration-200'
						>
							{tError('login_link')}
						</Link>
					</div>
				)}

				<div className='text-lg'>
					<Link
						to='/'
						className='text-indigo-300 hover:text-white transition-colors duration-200'
					>
						{tError('contact_support_link')}
					</Link>
				</div>
			</div>
		</Transition>
	);
};

export default ErrorPage;
