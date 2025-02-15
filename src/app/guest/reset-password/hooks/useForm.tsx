import { FormEvent } from 'react';
import { useForm as useTanStackForm } from '@tanstack/react-form';
import useForceLocaleRefresh from '@/hooks/locales/useForceLocaleRefresh';
import useValidation from './useValidation';
import useResetPassword from '@/hooks/mutations/sign-in/useResetPassword';

interface Fields {
	password: string;
	confirmPassword: string;
}
const defaultValues: Fields = {
	password: '',
	confirmPassword: '',
};

const useForm = (email: string, token: string) => {
	const { mutateAsync: reset } = useResetPassword();
	const schema = useValidation();

	const form = useTanStackForm<Fields>({
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
	useForceLocaleRefresh(form);

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

export default useForm;
