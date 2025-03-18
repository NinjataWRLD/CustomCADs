import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import ResetPassword from '@/app/guest/reset-password';

export const Route = createFileRoute('/_guest/reset-password')({
	component: ResetPassword,
	validateSearch: z.object({
		email: z.string().nonempty(),
		token: z.string().nonempty(),
	}),
});
