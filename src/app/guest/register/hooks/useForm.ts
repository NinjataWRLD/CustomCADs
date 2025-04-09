import { FormEvent } from 'react';
import { useForm as useTanStackForm } from '@tanstack/react-form';
import { useRegister } from '@/hooks/mutations/identity';
import { useForceLocaleRefresh } from '@/hooks/locales/useForceLocaleRefresh';
import { useSyncCarts } from '@/hooks/contexts/useSyncCarts';
import { useValidation } from './useValidation';

interface Fields {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
	firstName?: string;
	lastName?: string;
}
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

	const { mutateAsync: register } = useRegister();
	const form = useTanStackForm({
		defaultValues: defaultValues,
		onSubmit: async ({ value }) => {
			const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
			await register({ ...value, role, timeZone });
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
