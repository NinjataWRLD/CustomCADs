import { FormEvent } from 'react';
import { useForm as useTanStackForm } from '@tanstack/react-form';
import { Request } from '@/api/identity/sign-in/resources/login';
import useLogin from '@/hooks/mutations/sign-in/useLogin';
import useForceLocaleRefresh from '@/hooks/locales/useForceLocaleRefresh';
import useValidation from './useValidation';

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

const useForm = () => {
	const mutation = useLogin();
	const schema = useValidation();

	const form = useTanStackForm<Fields>({
		defaultValues: defaultValues,
		onSubmit: async ({ value }) => {
			const req: Request = { ...value };
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

export default useForm;
