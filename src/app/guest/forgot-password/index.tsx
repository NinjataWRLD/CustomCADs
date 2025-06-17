import { FormEvent, useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { useForgotPasswordTranslation } from '@/hooks/locales/pages/guest';
import { useFields } from './hooks/useFields';
import Transition from '@/app/components/transition';
import Button from '@/app/components/button';
import Border from '@/app/components/border';
import faviconImg from '@/assets/favicons/favicon.svg';

const ForgotPassword = () => {
	const [showMessage, setShowMessage] = useState(false);
	const tForgotPassword = useForgotPasswordTranslation();

	const { resendEmail, handleSubmit: handleFormSubmit, fields } = useFields();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		handleFormSubmit(e);
		setShowMessage(true);
	};

	useEffect(() => {
		const styleEl = document.createElement('style');
		styleEl.textContent = `
      .h1-text-shadow {
        text-shadow:
          2px 2px 5px hsla(275, 86%, 36%, 0.7),
          -2px -2px 5px hsla(277, 87%, 53%, 0.6),
          0px 0px 15px hsla(275, 100%, 25%, 0.5);
      }
      .h3-text-shadow {
        text-shadow:
          3px 3px 0px hsl(0, 0%, 0%),
          -1px -1px 0px hsl(0, 0%, 0%),
          1px 1px 2px hsla(0, 0%, 0%, 0.7);
      }
      .purple-gradient-bg {
        background: linear-gradient(45deg, hsl(269, 85%, 43%), hsl(276, 71%, 21%));
      }
      .purple-hover-gradient-bg {
        background: linear-gradient(45deg, hsl(304, 76%, 46%), hsl(269, 85%, 43%));
      }
    `;
		document.head.appendChild(styleEl);

		return () => {
			document.head.removeChild(styleEl);
		};
	}, []);

	return (
		<Transition>
			<div className='h-[100dvh] flex items-center justify-center'>
				<form
					onSubmit={handleSubmit}
					className='relative text-white flex flex-col justify-center items-center p-20 gap-4'
				>
					<Border />
					<img
						src={faviconImg}
						alt='CustomCADs'
						className='w-[50px] aspect-square'
					/>
					<h1 className='text-white h1-text-shadow'>
						{tForgotPassword('title')}
					</h1>
					<h3 className='w-4/5 text-center h3-text-shadow'>
						{tForgotPassword('instruction')}
					</h3>

					<div className='w-3/4 flex flex-col gap-[10px]'>
						{fields.Email}
					</div>

					<div className='flex flex-col justify-center items-center gap-[10px] mt-4'>
						<Button
							type='submit'
							text={tForgotPassword('button')}
						/>
						<div
							className={`flex flex-col justify-center items-center opacity-0 max-h-0 overflow-hidden transition-all duration-300 ease-in-out ${showMessage ? 'opacity-100 max-h-[100px]' : ''}`}
						>
							<p className='text-green-400/60'>
								{tForgotPassword('message')}
							</p>
							<a
								onClick={() => resendEmail()}
								className='cursor-pointer text-green-300 hover:text-white transition-colors duration-200 underline underline-offset-2'
							>
								{tForgotPassword('resend')}
							</a>
						</div>
					</div>

					<div className='flex flex-col mt-5 gap-[1.2rem]'>
						<Link
							to='/login'
							className='text-amber-100 hover:text-white'
						>
							{tForgotPassword('back')}
						</Link>
					</div>
				</form>
			</div>
		</Transition>
	);
};

export default ForgotPassword;
