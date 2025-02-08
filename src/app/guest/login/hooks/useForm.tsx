import { FormEvent } from 'react';
import { useForm as useTanStackForm } from '@tanstack/react-form';
import { Request } from '@/api/identity/sign-in/resources/login';
import useLogin from '@/hooks/mutations/sign-in/useLogin';
import useAuthz from '@/hooks/queries/identity/useAuthz';
import useForceLocaleRefresh from '@/hooks/locales/useForceLocaleRefresh';
import * as authStore from '@/stores/auth-store';
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
	const schema = useValidation();
	const mutation = useLogin();

	const authz = useAuthz();
	const updateAuthz = async () => {
		const { refetch } = authz;
		const { data: role } = await refetch();

		if (role) {
			alert(role);
			authStore.login(role);
		} else alert('problem...');
	};

	const form = useTanStackForm<Fields>({
		defaultValues: defaultValues,
		onSubmit: async ({ value }) => {
			const req: Request = { ...value };
			await mutation.mutateAsync(req);
			await updateAuthz();
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
