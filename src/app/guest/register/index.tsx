import { Link } from '@tanstack/react-router';
import { AppError } from '@/types/errors';
import { Route } from '@/routes/_guest/register/$role';
import { useRegisterTranslation } from '@/hooks/locales/pages/guest';
import Button from '@/app/components/button';
import Border from '@/app/components/border';
import Transition from '@/app/components/transition';
import Popup from './popup';
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

					{isSuccess && <Popup username={username} />}
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
