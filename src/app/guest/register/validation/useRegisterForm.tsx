import { FormEvent } from 'react';
import { useForm } from '@tanstack/react-form';
import { Request } from '@/api/identity/sign-up/resources/register';
import useRegister from '@/hooks/mutations/sign-up/useRegister';
import getTimezone from '@/utils/get-timezone';

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

	const form = useForm<Fields>({
		defaultValues: defaultValues,
		onSubmit: async ({ value }) => {
			const timeZone = getTimezone();
			const req: Request = { ...value, role, timeZone };
			await mutation.mutateAsync(req);
		},
	});
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
