import { Link } from '@tanstack/react-router';
import * as identitySSO from '@/api/identity/identity/sso';
import { useLoginTranslation } from '@/hooks/locales/pages/guest';
import Button from '@/app/components/button';
import Border from '@/app/components/border';
import FormError from '@/app/components/fields/error';
import SSOGoogle from '@/app/components/sso/google';
import { useFields } from './hooks/useFields';

const Login = () => {
	const { handleSubmit, fields, error } = useFields();
	const tLogin = useLoginTranslation();

	return (
		<form
			onSubmit={handleSubmit}
			className='h-[120dvh] flex justify-center items-center text-white'
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

				<div className='flex flex-col gap-8'>
					<Button type='submit' text={tLogin('btn')} />
					<SSOGoogle
						link={identitySSO.url({
							provider: 'Google',
							redirectUrl: window.location.origin,
						})}
					/>
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
	);
};

export default Login;
