import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm as useTanStackForm } from '@tanstack/react-form';
import useLogin from '@/hooks/mutations/sign-in/useLogin';
import useForceLocaleRefresh from '@/hooks/locales/useForceLocaleRefresh';
import useCartInit from '@/hooks/contexts/useCartInit';
import useUpdateAuthz from '@/hooks/stores/useUpdateAuthz';
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
	const { mutateAsync: login } = useLogin();

	const { dispatch } = useCartInit();
	const updateAuthz = useUpdateAuthz();
	const navigate = useNavigate();

	const form = useTanStackForm<Fields>({
		defaultValues: defaultValues,
		onSubmit: async ({ value }) => {
			await login(value);
			dispatch({ type: 'CLEAR_CART' });

			await updateAuthz();
			navigate('/');
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
