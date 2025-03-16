import { HTMLInputTypeAttribute, ReactNode } from 'react';
import type { AnyFieldApi } from '@tanstack/react-form';
import styles from './styles.module.css';

export const getErrorClass = (hasError: boolean) =>
	hasError ? styles.invalid : '';

type Common = {
	api: AnyFieldApi;
	label: string;
	format?: (value: string) => unknown;
};

type Input = {
	tag: 'input';
	type: HTMLInputTypeAttribute;
	placeholder?: string;
	accept?: string;
};

type TextArea = {
	tag: 'textarea';
	placeholder: string;
};

type Select = {
	tag: 'select';
	options: ReactNode;
};

type Custom = {
	tag: 'custom';
	field: ReactNode;
};

type FieldProps = Common & (Input | TextArea | Select | Custom);
const Field = (props: FieldProps) => {
	const { api, label, format } = props;

	const {
		name,
		state: { value, meta },
		handleBlur,
	} = api;
	if (value === undefined) return;

	const handleChange = (value: string) =>
		api.handleChange(format ? format(value) : value);

	const showError = meta.isBlurred && meta.isTouched;
	const hasError = !!meta.errors.length;

	let input;
	switch (props.tag) {
		case 'input':
			input = (
				<input
					type={props.type}
					id={name}
					name={name}
					value={value}
					onBlur={handleBlur}
					onChange={(e) => handleChange(e.target.value)}
					placeholder={props.placeholder}
					className={getErrorClass(showError && hasError)}
				/>
			);
			break;
		case 'textarea':
			input = (
				<textarea
					id={name}
					name={name}
					value={value}
					onBlur={handleBlur}
					onChange={(e) => handleChange(e.target.value)}
					placeholder={props.placeholder}
					className={getErrorClass(showError && hasError)}
				/>
			);
			break;
		case 'select':
			input = (
				<select
					id={name}
					name={name}
					value={value}
					onBlur={handleBlur}
					onChange={(e) => handleChange(e.target.value)}
					className={getErrorClass(showError && hasError)}
				>
					{props.options}
				</select>
			);
			break;
		case 'custom':
			input = props.field;
			break;
		default:
			break;
	}

	return (
		<>
			<label>{label}</label>
			{input}
			{showError && hasError ? (
				<small className={styles.error}>{meta.errors[0].message}</small>
			) : null}
		</>
	);
};

export default Field;
