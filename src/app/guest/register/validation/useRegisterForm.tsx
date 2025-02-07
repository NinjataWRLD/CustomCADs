import { FormEvent } from 'react';
import { useForm } from '@tanstack/react-form';
import { Request } from '@/api/identity/sign-up/resources/register';
import useRegister from '@/hooks/mutations/sign-up/useRegister';
import useForceLocaleRefresh from '@/hooks/locales/useForceLocaleRefresh';
import getTimezone from '@/utils/get-timezone';
import useRegisterValidation from './useRegisterValidation';

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

const useRegisterForm = (role: 'Client' | 'Contributor') => {
	const mutation = useRegister();
	const schema = useRegisterValidation();

	const form = useForm<Fields>({
		defaultValues: defaultValues,
		onSubmit: async ({ value }) => {
			const timeZone = getTimezone();
			const req: Request = { ...value, role, timeZone };
			await mutation.mutateAsync(req);
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

export default useRegisterForm;
