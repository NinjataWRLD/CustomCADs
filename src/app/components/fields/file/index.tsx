import { ChangeEvent } from 'react';
import { AnyFieldApi } from '@tanstack/react-form';
import Field, { getErrorClass } from '..';
import styles from './styles.module.css';

interface FileFieldProps {
	api: AnyFieldApi;
	label: string;
	accept: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FileField = ({ api, label, accept, onChange }: FileFieldProps) => {
	const { isBlurred, isTouched, errors } = api.state.meta;
	const showError = isBlurred && isTouched;
	const hasError = !!errors.length;

	return (
		<Field
			tag='custom'
			api={api}
			label={label}
			field={
				<input
					type='file'
					accept={accept}
					id={api.name}
					name={api.name}
					onBlur={api.handleBlur}
					onChange={(e) => {
						const file = e.target.files?.[0] ?? null;
						api.handleChange(file);
						if (onChange) onChange(e);
					}}
					className={`${getErrorClass(showError && hasError)} border border-gray-300 p-4 hover:border-[#888] hover:cursor-pointer`}
				/>
			}
			showErrorWhenDirty
		/>
	);
};

export default FileField;
