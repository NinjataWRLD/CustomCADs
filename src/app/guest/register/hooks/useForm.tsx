import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm as useTanStackForm } from '@tanstack/react-form';
import useRegister from '@/hooks/mutations/sign-up/useRegister';
import useForceLocaleRefresh from '@/hooks/locales/useForceLocaleRefresh';
import useSyncCarts from '@/hooks/contexts/useSyncCarts';
import useUpdateAuthz from '@/hooks/stores/useUpdateAuthz';
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
	const schema = useValidation();
	const navigate = useNavigate();

	const { mutateAsync: register } = useRegister();
	const updateAuthz = useUpdateAuthz();

	useSyncCarts();

	const form = useTanStackForm({
		defaultValues: defaultValues,
		onSubmit: async ({ value }) => {
			const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
			await register({ ...value, role, timeZone });
			await updateAuthz();

			navigate('/');
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

export default useForm;
