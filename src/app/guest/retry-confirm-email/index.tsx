import { Route } from '@/routes/_guest/retry-confirm-email.$username';
import { useRetryConfirmEmail } from '@/hooks/mutations/identity';
import { useIdempotencyKeys } from '@/hooks/useIdempotencyKeys';
import Transition from '@/app/components/transition';
import { useRetryConfirmEmailTranslation } from '@/hooks/locales/pages/guest';

const RetryConfirmEmail = () => {
	const { idempotencyKeys } = useIdempotencyKeys(['retry'] as const);

	const { username } = Route.useParams();
	const { mutateAsync: retryConfirmEmail, ...req } = useRetryConfirmEmail();

	const tRetryConfirmEmail = useRetryConfirmEmailTranslation();
	const handleClick = async () => {
		await retryConfirmEmail({
			idempotencyKey: idempotencyKeys.retry,
			username: username,
		});
	};

	return (
		<Transition>
			<div className='h-[100dvh] flex items-center justify-center'>
				<h1>{tRetryConfirmEmail('title')}</h1>
				<button onClick={handleClick}>
					{tRetryConfirmEmail('btn')}
				</button>
				{req.data !== undefined && tRetryConfirmEmail('success')}
				{req.error !== undefined && tRetryConfirmEmail('error')}
			</div>
		</Transition>
	);
};

export default RetryConfirmEmail;
