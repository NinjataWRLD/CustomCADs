import RetryConfirmEmail from '@/app/guest/retry-confirm-email';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_guest/retry-confirm-email/$username')({
	component: RetryConfirmEmail,
});
