import { FormEvent } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useForm as useTanStackForm } from '@tanstack/react-form';
import { useLogin } from '@/hooks/mutations/identity';
import { useForceLocaleRefresh } from '@/hooks/locales/useForceLocaleRefresh';
import { useSyncCarts } from '@/hooks/contexts/useSyncCarts';
import { useUpdateAuthz } from '@/hooks/stores/useUpdateAuthz';
import { extractError } from '@/utils/form';
import { useValidation } from './useValidation';

type Fields = {
	username: string;
	password: string;
	rememberMe: boolean;
};
const defaultValues: Fields = {
	username: '',
	password: '',
	rememberMe: false,
};

export const useForm = () => {
	const schema = useValidation();
	const navigate = useNavigate();

	const { error, mutateAsync: login } = useLogin();
	const updateAuthz = useUpdateAuthz();

	useSyncCarts();

	const form = useTanStackForm({
		defaultValues: defaultValues,
		onSubmit: async ({ value }) => {
			await login(value);
			await updateAuthz();

			navigate({ to: '/' });
		},
		validators: {
			onChange: schema,
		},
	});
	useForceLocaleRefresh(() => form.validate('change'));

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();
		form.handleSubmit();
	};

	return {
		form,
		handleSubmit,
		error: extractError(error as any)
	};
};
