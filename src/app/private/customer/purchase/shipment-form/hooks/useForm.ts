import { useForm as useTanstackForm } from '@tanstack/react-form';
import { useValidation } from './useValidation';
import { FormEvent } from 'react';

export interface Fields {
	country: string;
	city: string;
	service: string;
	email: string;
	phone: string;
	count: number;
}
const defaultValues: Fields = {
	country: '',
	city: '',
	service: '',
	email: '',
	phone: '',
	count: 1,
};

export const useForm = (onSubmit: (values: Fields) => void) => {
	const schema = useValidation();
	const form = useTanstackForm({
		defaultValues: defaultValues,
		onSubmit: ({ value }) => onSubmit(value),
		validators: {
			onChange: schema,
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
