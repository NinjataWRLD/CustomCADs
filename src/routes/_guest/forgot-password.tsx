import { createFileRoute } from '@tanstack/react-router';
import ForgotPassword from '@/app/guest/forgot-password';

export const Route = createFileRoute('/_guest/forgot-password')({
	component: ForgotPassword,
});
