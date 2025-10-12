import { FormEvent, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useForm as useTanStackForm } from '@tanstack/react-form';
import { useForceLocaleRefresh } from '@/hooks/locales/useForceLocaleRefresh';
import { useFilesUploader } from '@/hooks/useFilesUploader';
import { FileData } from '@/types/files';
import { useValidation } from './useValidation';
import { extractError } from '@/utils/form';
import { useCreator } from './useCreator';

type Fields = {
	name: string;
	description: string;
	categoryId: number;
	price: number;
	image: File | null;
	cad: File | null;
};
const defaultValues: Fields = {
	name: '',
	description: '',
	categoryId: 1,
	price: 0,
	image: null,
	cad: null,
};

export const useForm = () => {
	const schema = useValidation();
	const navigate = useNavigate();

	const [value, setValue] = useState<Fields>(defaultValues);
	const [files, setFiles] = useState<{ image: FileData; cad: FileData }>();

	const { ref, error } = useCreator(files, value, () =>
		navigate({ to: '/gallery' }),
	);
	useFilesUploader(value, setFiles);

	const form = useTanStackForm({
		defaultValues: defaultValues,
		onSubmit: ({ value }) => setValue(value),
		validators: { onChange: schema },
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
		ref,
		error: extractError(error),
		setCad: (cad: File | null) => setValue((prev) => ({ ...prev, cad })),
		setImage: (image: File | null) =>
			setValue((prev) => ({ ...prev, image })),
	};
};
