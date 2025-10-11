import { FormEvent, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useForgotPasswordTranslation } from '@/hooks/locales/pages/guest';
import { useFields } from './hooks/useFields';
import Button from '@/app/components/button';
import Border from '@/app/components/border';
import FormError from '@/app/components/fields/error';

const ForgotPassword = () => {
	const [showMessage, setShowMessage] = useState(false);
	const tForgotPassword = useForgotPasswordTranslation();

	const {
		sendEmail,
		handleSubmit: handleFormSubmit,
		fields,
		error,
	} = useFields();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		handleFormSubmit(e);
		setShowMessage(true);
	};

	return (
		<div className='h-[100dvh] flex items-center justify-center'>
			<form
				onSubmit={handleSubmit}
				className='relative text-white flex flex-col justify-center items-center p-20 gap-4'
			>
				<Border />
				<h1 className='text-white title-text-shadow'>
					{tForgotPassword('title')}
				</h1>
				<h3 className='w-4/5 text-center subtitle-text-shadow'>
					{tForgotPassword('instruction')}
				</h3>

				<div className='w-3/4 flex flex-col gap-[10px]'>
					{fields.Email}
				</div>

				<div className='flex flex-col justify-center items-center gap-[10px] mt-4'>
					<Button type='submit' text={tForgotPassword('button')} />
					<FormError error={error} />
					<div
						className={`flex flex-col justify-center items-center opacity-0 max-h-0 overflow-hidden transition-all duration-300 ease-in-out ${showMessage ? 'opacity-100 max-h-[100px]' : ''}`}
					>
						<p className='text-green-400/60'>
							{tForgotPassword('message')}
						</p>
						<a
							onClick={sendEmail}
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
	);
};

export default ForgotPassword;
