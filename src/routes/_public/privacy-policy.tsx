import { createFileRoute } from '@tanstack/react-router';
import PrivacyPolicy from '@/app/public/privacy-policy';

export const Route = createFileRoute('/_public/privacy-policy')({
	component: PrivacyPolicy,
});
