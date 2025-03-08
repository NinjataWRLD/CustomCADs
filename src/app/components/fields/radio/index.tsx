import { ChangeEvent } from 'react';

interface RadioFieldProps {
	value: string;
	checked: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	label: string;
}

const RadioField = ({ value, checked, onChange, label }: RadioFieldProps) => {
	return (
		<>
			<input
				id={value}
				type='radio'
				name='radio'
				value={value}
				checked={checked}
				onChange={onChange}
			/>
			<label htmlFor={value}>{label}</label>
		</>
	);
};

export default RadioField;
