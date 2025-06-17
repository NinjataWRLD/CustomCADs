import { useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { Route } from '@/routes/_guest/register/$role';
import { useRegisterTranslation } from '@/hooks/locales/pages/guest';
import Button from '@/app/components/button';
import Border from '@/app/components/border';
import Transition from '@/app/components/transition';
import { useFields } from './hooks/useFields';

const Register = () => {
	const { role } = Route.useParams();
	const { handleSubmit, fields } = useFields(
		role === 'customer' ? 'Customer' : 'Contributor',
	);

	const tRegister = useRegisterTranslation();
	if (role !== 'customer' && role !== 'contributor')
		throw new Error("You must register as a 'customer' or 'contributor'");

	useEffect(() => {
		const styleEl = document.createElement('style');
		styleEl.textContent = `
      .form-hover-heading:hover h1 {
        color: rgba(255, 255, 255, 0.9);
        text-shadow:
          0 0 10px rgba(138, 43, 226, 0.8),
          0 0 20px rgba(138, 43, 226, 0.6),
          0 0 30px rgba(186, 85, 211, 0.7),
          0 0 40px rgba(186, 85, 211, 0.5);
        transition: text-shadow 0.3s linear;
      }
    `;
		document.head.appendChild(styleEl);

		return () => {
			document.head.removeChild(styleEl);
		};
	}, []);

	return (
		<Transition>
			<div className='relative h-[100dvh] flex justify-center items-center text-white'>
				<form
					onSubmit={handleSubmit}
					className='form-hover-heading relative flex flex-col justify-center items-center w-1/2 px-12 py-3 mt-3'
				>
					<Border />
					<h1 className='text-white transition-all duration-300'>
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
