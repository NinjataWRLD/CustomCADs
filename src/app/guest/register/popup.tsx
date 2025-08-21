import { useRegisterTranslation } from '@/hooks/locales/pages/guest';
import { Link } from '@tanstack/react-router';

type MessagesProps = { username: string | null };
const Popup = ({ username }: MessagesProps) => {
	const tRegister = useRegisterTranslation();

	return (
		<>
			<div className='absolute w-screen h-screen bg-black opacity-70 z-[100]' />
			<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-[101] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-2xl shadow-2xl border border-gray-700/50 backdrop-blur-sm'>
				<div className='p-8 text-center'>
					<div className='mx-auto w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-6'>
						<svg
							className='w-8 h-8 text-purple-400'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M5 13l4 4L19 7'
							/>
						</svg>
					</div>

					<h2 className='text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
						{tRegister('email-sent')}
					</h2>

					{username && (
						<p className='text-gray-300 leading-relaxed mb-6'>
							{tRegister('resend-message')}
							<Link
								to='/retry-confirm-email/$username'
								params={{ username: username! }}
								className='inline-block ml-1 text-purple-400 hover:text-purple-300 transition-all duration-200 font-medium hover:underline decoration-purple-400/50 underline-offset-2'
							>
								{tRegister('resend')}
							</Link>
						</p>
					)}
					<div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-2xl' />
				</div>
			</div>
		</>
	);
};

export default Popup;
