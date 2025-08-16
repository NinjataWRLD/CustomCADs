import { FormEvent } from 'react';
import { useForm as useTanStackForm } from '@tanstack/react-form';
import { useRegister } from '@/hooks/mutations/identity';
import { useForceLocaleRefresh } from '@/hooks/locales/useForceLocaleRefresh';
import { useSyncCarts } from '@/hooks/contexts/useSyncCarts';
import { useValidation } from './useValidation';

type Fields = {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
	firstName?: string;
	lastName?: string;
};
const defaultValues: Fields = {
	username: '',
	email: '',
	password: '',
	confirmPassword: '',
	firstName: '',
	lastName: '',
};

export const useForm = (role: 'Customer' | 'Contributor') => {
	const schema = useValidation();
	useSyncCarts();

	const { isSuccess, mutateAsync: register } = useRegister();
	const form = useTanStackForm({
		defaultValues: defaultValues,
		onSubmit: async ({ value }) => {
			await register({ ...value, role });
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
		isSuccess,
	};
};
