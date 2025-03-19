import { createFileRoute } from '@tanstack/react-router';
import Editor from '@/app/public/editor';

export const Route = createFileRoute('/_public/editor/$id')({
	component: Editor,
});
