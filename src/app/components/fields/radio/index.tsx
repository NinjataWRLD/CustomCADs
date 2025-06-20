import { ChangeEvent } from 'react';

interface RadioFieldProps {
	name?: string;
	value: string;
	checked: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	label: string;
}

const RadioField = ({
	name,
	value,
	checked,
	onChange,
	label,
}: RadioFieldProps) => {
	return (
		<>
			<input
				id={value}
				type='radio'
				name={name ?? 'radio'}
				value={value}
				checked={checked}
				onChange={onChange}
			/>
			<label htmlFor={value}>{label}</label>
		</>
	);
};

export default RadioField;
