import { FormEvent, useState } from 'react';
import { useForm as useTanStackForm } from '@tanstack/react-form';
import { useForgotPassword } from '@/hooks/queries/identity';
import { useForceLocaleRefresh } from '@/hooks/locales/useForceLocaleRefresh';
import { useValidation } from './useValidation';

interface Fields {
	email: string;
}
const defaultValues: Fields = {
	email: '',
};

export const useForm = () => {
	const [email, setEmail] = useState('');
	const { refetch } = useForgotPassword({ email: email }, !!email);
	const schema = useValidation();

	const form = useTanStackForm({
		defaultValues: defaultValues,
		onSubmit: ({ value }) => {
			setEmail(value.email);
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
		refetch,
		handleSubmit,
	};
};
