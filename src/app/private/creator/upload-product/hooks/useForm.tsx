import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm as useTanStackForm } from '@tanstack/react-form';
import { useForceLocaleRefresh } from '@/hooks/locales/useForceLocaleRefresh';
import { FileData } from '@/types/files';
import { useValidation } from './useValidation';
import { useUploader } from './useUploader';
import { useCreator } from './useCreator';

interface Fields {
	name: string;
	description: string;
	categoryId: number;
	price: number;
	image: File | null;
	cad: File | null;
}
const defaultValues: Fields = {
	name: '',
	description: '',
	categoryId: 0,
	price: 0,
	image: null,
	cad: null,
};

export const useForm = () => {
	const schema = useValidation();
	const navigate = useNavigate();

	const [value, setValue] = useState<Fields>();

	const [files, setFiles] = useState<{ image: FileData; cad: FileData }>();
	const uploadFiles = useUploader(setFiles);

	const [cad, setCad] = useState<File | null>(null);
	const ref = useCreator(cad, files, value, () => navigate('/gallery'));

	useEffect(() => {
		if (value) {
			const { name, image, cad } = value;
			uploadFiles(name, image, cad);
		}
	}, [value]);

	const form = useTanStackForm({
		defaultValues: defaultValues,
		onSubmit: async ({ value }) => setValue(value),
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
		setCad,
		ref,
	};
};
