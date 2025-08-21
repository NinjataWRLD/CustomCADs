import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useForm as useTanStackForm } from '@tanstack/react-form';
import { useForceLocaleRefresh } from '@/hooks/locales/useForceLocaleRefresh';
import { FileData } from '@/types/files';
import { useValidation } from './useValidation';
import { uploadFiles } from '@/utils/uploader';
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

	const [value, setValue] = useState<Fields>();

	const [files, setFiles] = useState<{ image: FileData; cad: FileData }>();
	const [cad, setCad] = useState<File | null>(null);
	const ref = useCreator(cad, files, value, () =>
		navigate({ to: '/gallery' }),
	);

	useEffect(() => {
		if (value) {
			const { name, image, cad } = value;
			uploadFiles(name, image, cad, setFiles);
		}
	}, [value]);

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
		cadSet: !!cad,
		setCad,
		ref,
	};
};
