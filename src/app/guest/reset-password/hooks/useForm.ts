import { FormEvent } from 'react';
import { useForm as useTanStackForm } from '@tanstack/react-form';
import { useForceLocaleRefresh } from '@/hooks/locales/useForceLocaleRefresh';
import { useResetPassword } from '@/hooks/mutations/identity';
import { useValidation } from './useValidation';

type Fields = {
	password: string;
	confirmPassword: string;
};
const defaultValues: Fields = {
	password: '',
	confirmPassword: '',
};

export const useForm = (email: string, token: string) => {
	const { mutateAsync: reset } = useResetPassword();
	const schema = useValidation();

	const form = useTanStackForm({
		defaultValues: defaultValues,
		onSubmit: async ({ value }) => {
			await reset({
				newPassword: value.password,
				email: email,
				token: token,
			});
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
