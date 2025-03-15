import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm as useTanStackForm } from '@tanstack/react-form';
import { useLogin } from '@/hooks/mutations/identity';
import { useForceLocaleRefresh } from '@/hooks/locales/useForceLocaleRefresh';
import { useSyncCarts } from '@/hooks/contexts/useSyncCarts';
import { useUpdateAuthz } from '@/hooks/stores/useUpdateAuthz';
import { useValidation } from './useValidation';

interface Fields {
	username: string;
	password: string;
	rememberMe: boolean;
}
const defaultValues: Fields = {
	username: '',
	password: '',
	rememberMe: false,
};

export const useForm = () => {
	const schema = useValidation();
	const navigate = useNavigate();

	const { mutateAsync: login } = useLogin();
	const updateAuthz = useUpdateAuthz();

	useSyncCarts();

	const form = useTanStackForm({
		defaultValues: defaultValues,
		onSubmit: async ({ value }) => {
			await login(value);
			await updateAuthz();

			navigate('/');
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
	};
};
