import { HTMLInputTypeAttribute, ReactNode } from 'react';
import type { AnyFieldApi } from '@tanstack/react-form';

export const getErrorClass = (hasError: boolean) =>
	hasError
		? 'border border-red-500 bg-red-100 text-black'
		: 'border border-gray-300';

type Common = {
	api: AnyFieldApi;
	label: string;
	format?: (value: string) => unknown;
	showErrorWhenDirty?: boolean;
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

	if (value === undefined) return null;

	const handleChange = (value: string) =>
		api.handleChange(format ? format(value) : value);

	const dirty = props.showErrorWhenDirty ? meta.isDirty : true;
	const showError = meta.isBlurred && meta.isTouched && dirty;
	const hasError = !!meta.errors.length;

	const baseInputClass = `w-full p-2.5 
						${showError && hasError ? 'text-black bg-red-100' : 'text-white bg-black'} 
						border-2 rounded-[10px] outline-none 
						transition-colors duration-300 
						focus:border-purple-500 focus:shadow-white/60 
						font-['Ubuntu'] text-base border-gray-500
						focus:outline-none focus:ring focus:ring-purple-300`;

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
					className={`${baseInputClass} ${getErrorClass(showError && hasError)}`}
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
					className={`${baseInputClass} ${getErrorClass(showError && hasError)} resize-none`}
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
					className={`${baseInputClass} ${getErrorClass(showError && hasError)}`}
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
			<label className='block mb-1 font-medium'>{label}</label>
			<div className='relative w-full'>
				{input}
				{showError && hasError && (
					<small className='absolute top-full right-0 text-red-500 text-[0.85rem] mt-0.5 whitespace-nowrap'>
						{meta.errors[0].message}
					</small>
				)}
			</div>
		</>
	);
};

export default Field;
