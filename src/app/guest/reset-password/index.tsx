import { Link } from '@tanstack/react-router';
import { useResetPasswordTranslation } from '@/hooks/locales/pages/guest';
import { Route } from '@/routes/_guest/reset-password';
import Transition from '@/app/components/transition';
import Button from '@/app/components/button';
import Border from '@/app/components/border';
import FormError from '@/app/components/fields/error';
import { useFields } from './hooks/useFields';

const ResetPassword = () => {
	const tResetPassword = useResetPasswordTranslation();
	const search = Route.useSearch();
	const { handleSubmit, fields, error } = useFields(search);

	return (
		<Transition>
			<div className='h-[100dvh] flex items-center justify-center'>
				<form
					onSubmit={handleSubmit}
					className='relative w-2/5 h-4/5 text-white flex flex-col gap-4 justify-center items-center'
				>
					<Border />
					<h1 className='text-white title-text-shadow'>
						{tResetPassword('title')}
					</h1>
					<h3 className='w-4/5 text-center subtitle-text-shadow'>
						{tResetPassword('instruction')}
					</h3>

					<div className='w-3/4 flex flex-col gap-[10px] mb-5'>
						{fields.Password}
					</div>
					<div className='w-3/4 flex flex-col gap-[10px] mb-5'>
						{fields.ConfirmPassword}
					</div>

					<div className='flex flex-col justify-center items-center gap-[10px] mt-[10px]'>
						<Button type='submit' text={tResetPassword('button')} />
					</div>

					<FormError error={error} />

					<div className='flex flex-col mt-5 gap-[1.2rem]'>
						<Link
							to='/login'
							className='text-amber-100 hover:text-white'
						>
							{tResetPassword('back')}
						</Link>
					</div>
				</form>
			</div>
		</Transition>
	);
};

export default ResetPassword;
