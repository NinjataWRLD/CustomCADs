import * as authStore from '@/stores/auth-store';
import { Route } from '@/routes/_guest/confirm-email';
import { authz } from '@/api/identity/identity';
import { useConfirmEmail, useRefresh } from '@/hooks/mutations/identity';
import { useIdempotencyKeys } from '@/hooks/useIdempotencyKeys';
import Transition from '@/app/components/transition';
import { useConfirmEmailTranslation } from '@/hooks/locales/pages/guest';

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
			<div className='h-[100dvh] flex items-center justify-center'>
				<h1>{tConfirmEmail('title')}</h1>
				<button onClick={handleClick}>{tConfirmEmail('btn')}</button>
				{req.data !== undefined && tConfirmEmail('success')}
				{req.error !== undefined && tConfirmEmail('error')}
			</div>
		</Transition>
	);
};

export default ConfirmEmail;
