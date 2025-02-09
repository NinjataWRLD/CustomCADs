import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm as useTanStackForm } from '@tanstack/react-form';
import useRegister from '@/hooks/mutations/sign-up/useRegister';
import useForceLocaleRefresh from '@/hooks/locales/useForceLocaleRefresh';
import useCartInit from '@/hooks/contexts/useCartInit';
import useUpdateAuthz from '@/hooks/stores/useUpdateAuthz';
import getTimezone from '@/utils/get-timezone';
import useValidation from './useValidation';

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

const useForm = (role: 'Client' | 'Contributor') => {
	const { mutateAsync: register } = useRegister();
	const schema = useValidation();

	const { dispatch } = useCartInit();
	const updateAuthz = useUpdateAuthz();
	const navigate = useNavigate();

	const form = useTanStackForm<Fields>({
		defaultValues: defaultValues,
		onSubmit: async ({ value }) => {
			const timeZone = getTimezone();
			await register({ ...value, role, timeZone });
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
