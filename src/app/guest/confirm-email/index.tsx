import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import * as authStore from '@/stores/auth-store';
import { Route } from '@/routes/_guest/confirm-email';
import { authz } from '@/api/identity/identity';
import { useConfirmEmail, useRefresh } from '@/hooks/mutations/identity';
import { useIdempotencyKeys } from '@/hooks/useIdempotencyKeys';
import { useConfirmEmailTranslation } from '@/hooks/locales/pages/guest';
import Transition from '@/app/components/transition';
import StatusMessage from '@/app/components/state/status-message';

const ConfirmEmail = () => {
	const { idempotencyKeys } = useIdempotencyKeys([
		'confirm',
		'refresh',
	] as const);
	const { username, token } = Route.useSearch();

	const { mutateAsync: confirmEmail, ...req } = useConfirmEmail();
	const { mutateAsync: refresh } = useRefresh();

	const tConfirmEmail = useConfirmEmailTranslation();
	const handleClick = async () => {
		await confirmEmail({
			idempotencyKey: idempotencyKeys.confirm,
			token,
			username,
		});
		await refresh({ idempotencyKey: idempotencyKeys.refresh });

		const { data: role } = await authz();
		authStore.login(role);
	};

	return (
		<Transition>
			<div className='relative h-[100dvh] flex items-center justify-center'>
				<div className='w-full max-w-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700/50 backdrop-blur-sm p-10'>
					<div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 rounded-t-2xl'></div>

					<div className='text-center'>
						<div className='mx-auto w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-6'>
							<FontAwesomeIcon
								icon={faEnvelope}
								className='text-2xl text-purple-400'
							/>
						</div>

						<h1 className='text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
							{tConfirmEmail('title')}
						</h1>

						<button
							onClick={handleClick}
							className='w-full cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 mb-6 text-[16px]'
						>
							{tConfirmEmail('btn')}
						</button>

						<StatusMessage
							success={{
								show: req.data !== undefined,
								message: tConfirmEmail('success'),
							}}
							failure={{
								show: req.error !== null,
								message: tConfirmEmail('error'),
							}}
						/>
					</div>
				</div>
			</div>
		</Transition>
	);
};

export default ConfirmEmail;
