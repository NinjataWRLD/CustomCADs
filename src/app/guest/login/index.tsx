import { useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { useLoginTranslation } from '@/hooks/locales/pages/guest';
import Button from '@/app/components/button';
import Border from '@/app/components/border';
import Transition from '@/app/components/transition';
import FormError from '@/app/components/fields/error';
import { useFields } from './hooks/useFields';

const Login = () => {
	const { handleSubmit, fields, error } = useFields();
	const tLogin = useLoginTranslation();

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
			<form
				onSubmit={handleSubmit}
				className='h-[100dvh] flex justify-center items-center text-white'
			>
				<div className='form-hover-heading relative flex flex-col justify-center items-center w-2/5 p-12 gap-8 mt-10'>
					<Border />
					<h1 className='text-white transition-all duration-300'>
						{tLogin(`title`)}
					</h1>

					<div className='w-full flex flex-col items-center gap-[10px] mt-[10px]'>
						{fields.Username}
					</div>

					<div className='w-full flex flex-col items-center gap-[10px] mt-[10px]'>
						{fields.Password}
					</div>

					{fields.RememberMe}

					<div>
						<Button type='submit' text={tLogin('btn')} />
					</div>

					<FormError error={error} />

					<p>
						{tLogin('register-message')}
						<Link
							to='/register'
							className='text-purple-300/80 relative transition-colors duration-200 hover:text-purple-300/40'
						>
							{' '}
							{tLogin('register')}{' '}
						</Link>
						<Link
							className='relative block text-center cursor-pointer z-[90] transition-all duration-300 mt-[5px] text-yellow-100 hover:text-white/60 active:text-purple-500/50'
							to='/'
						>
							{tLogin('go-back')}
						</Link>
					</p>
				</div>
			</form>
		</Transition>
	);
};

export default Login;
