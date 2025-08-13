import { useMyAccountTranslation } from '@/hooks/locales/pages/public';
import { useForgotPassword } from '@/hooks/mutations/identity';
import { useIdempotencyKeys } from '@/hooks/useIdempotencyKeys';

type SecurityProps = {
	email: string;
};
const Security = ({ email }: SecurityProps) => {
	const tMyAccount = useMyAccountTranslation();

	const { idempotencyKeys } = useIdempotencyKeys(['email'] as const);
	const { mutateAsync, isSuccess } = useForgotPassword();

	const sendEmail = async () => {
		await mutateAsync({
			email: email,
			idempotencyKey: idempotencyKeys.email,
		});
	};

	return (
		<div className='flex flex-col gap-[20px]'>
			<div className='relative flex flex-col gap-5 justify-center ml-5'>
				<div className='flex gap-5'>
					<h2>{tMyAccount('email')}</h2>
					<p className='flex justify-center items-center font-bold text-[1.4rem] ml-5 title-text-shadow'>
						{email}
					</p>
				</div>
			</div>

			<div className='relative flex flex-col gap-5 justify-center ml-5'>
				<h2>{tMyAccount('forgot-password')}</h2>
				<button
					className="relative z-[1] inline-block w-[200px] h-[50px] p-[10px] text-[14px] tracking-[1px] uppercase text-white text-center font-bold bg-black border-[3px] border-solid border-[#6347b55a] rounded-[30px] shadow-[0_2px_10px_rgba(0,0,0,0.16),_0_3px_6px_rgba(0,0,0,0.1)] cursor-pointer no-underline transition-all duration-300 ease-in-out hover:text-black focus:text-black active:scale-90 before:content-[''] before:absolute before:inset-y-0 before:left-1/2 before:right-1/2 before:bg-white before:rounded-[30px] before:z-[-1] before:opacity-0 before:transition-all before:duration-500 before:ease-in-out hover:before:left-0 hover:before:right-0 hover:before:opacity-100 focus:before:left-0 focus:before:right-0 focus:before:opacity-100"
					onClick={sendEmail}
				>
					{tMyAccount('change-password')}
				</button>
				{isSuccess && (
					<p className='text-green-300 fade-in'>
						{tMyAccount('change-password-text')}
					</p>
				)}
				<p className='text-[0.95em] italic'>
					{tMyAccount('security-warning')}
				</p>
			</div>
		</div>
	);
};

export default Security;
