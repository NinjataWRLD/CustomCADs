import { Link } from '@tanstack/react-router';
import { AppError } from '@/types/errors';
import { Route } from '@/routes/_guest/register/$role';
import { useRegisterTranslation } from '@/hooks/locales/pages/guest';
import Button from '@/app/components/button';
import Border from '@/app/components/border';
import Transition from '@/app/components/transition';
import { useFields } from './hooks/useFields';

const Register = () => {
	const { role } = Route.useParams();
	const { handleSubmit, fields, username, isSuccess } = useFields(
		role === 'customer' ? 'Customer' : 'Contributor',
	);

	const tRegister = useRegisterTranslation();
	if (role !== 'customer' && role !== 'contributor')
		throw new AppError({
			title: 'Invalid role',
			message:
				'You must register either as a "Customer" or a "Contributor".',
			tip: 'Follow the proper links leading to the Register page.',
		});

	return (
		<Transition>
			<div className='relative h-[100dvh] flex justify-center items-center text-white'>
				<form
					onSubmit={handleSubmit}
					className='form-hover-heading relative flex flex-col justify-center items-center w-1/2 px-12 py-3 mt-3'
				>
					<Border isAvailable={!isSuccess} />

					<h1 className='hover:title-text-shadow transition-all duration-300'>
						{tRegister(`title-${role}`)}
					</h1>

					<div className='w-full flex justify-around'>
						<div className='w-2/5 flex flex-col items-center gap-[10px] mt-5 relative'>
							{fields.FirstName}
						</div>
						<div className='w-2/5 flex flex-col items-center gap-[10px] mt-5 relative'>
							{fields.LastName}
						</div>
					</div>

					<div className='w-3/4 flex flex-col items-center gap-[10px] mt-5 relative'>
						{fields.Username}
					</div>

					<div className='w-3/4 flex flex-col items-center gap-[10px] mt-5 relative'>
						{fields.Email}
					</div>

					<div className='w-3/4 flex flex-col items-center gap-[10px] mt-5 relative'>
						{fields.Password}
					</div>

					<div className='w-3/4 flex flex-col items-center gap-[10px] mt-5 relative'>
						{fields.ConfirmPassword}
					</div>

					<div className='my-[30px] mx-5'>
						<Button type='submit' text={tRegister('btn')} />
					</div>

					{isSuccess && (
						<>
							<div className='absolute w-screen h-screen bg-black opacity-70 z-[100]'></div>
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

									<div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-2xl'></div>
								</div>
							</div>
						</>
					)}

					<p>
						{tRegister('login-message')}
						<Link
							to='/login'
							className='text-purple-300/80 relative hover:text-purple-300 transition-colors duration-200'
						>
							{' '}
							{tRegister('login')}{' '}
						</Link>
					</p>
				</form>
			</div>
		</Transition>
	);
};

export default Register;
