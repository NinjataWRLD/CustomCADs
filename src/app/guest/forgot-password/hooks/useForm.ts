import { FormEvent, useState } from 'react';
import { useForm as useTanStackForm } from '@tanstack/react-form';
import { useForgotPassword } from '@/hooks/mutations/identity';
import { useForceLocaleRefresh } from '@/hooks/locales/useForceLocaleRefresh';
import { useValidation } from './useValidation';
import { useIdempotencyKeys } from '@/hooks/useIdempotencyKeys';

type Fields = {
	email: string;
};
const defaultValues: Fields = {
	email: '',
};

export const useForm = () => {
	const [email, setEmail] = useState('');
	const schema = useValidation();

	const { idempotencyKeys } = useIdempotencyKeys(['email'] as const);
	const { mutateAsync } = useForgotPassword();

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
		sendEmail: async () =>
			await mutateAsync({
				email: email,
				idempotencyKey: idempotencyKeys.email,
			}),
		handleSubmit,
	};
};
