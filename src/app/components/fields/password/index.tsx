import { useState } from 'react';
import { AnyFieldApi } from '@tanstack/react-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Field from '..';

interface PasswordFieldProps {
	api: AnyFieldApi;
	label: string;
	placeholder: string;
}

const PasswordField = ({ api, label, placeholder }: PasswordFieldProps) => {
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible((prev) => !prev);

	const { isBlurred, isTouched, errors } = api.state.meta;
	const showError = isBlurred && isTouched;
	const hasError = !!errors.length;

	const inputClass = `
		w-full px-3 py-2 border rounded
		${showError && hasError ? 'border-red-500 bg-red-100 text-black' : 'border-gray-300'}
	`;

	return (
		<Field
			tag='custom'
			api={api}
			label={label}
			field={
				<div className='flex flex-col w-full mr-[25px] relative'>
					<input
						type={isVisible ? 'text' : 'password'}
						id={api.name}
						name={api.name}
						value={api.state.value}
						onBlur={api.handleBlur}
						onChange={(e) => api.handleChange(e.target.value)}
						placeholder={placeholder}
						className={inputClass}
					/>
					<span
						onClick={toggleVisibility}
						className='absolute right-[5px] top-1/2 -translate-y-1/2 cursor-pointer text-[10px]'
					>
						<FontAwesomeIcon
							icon={isVisible ? faEye : faEyeSlash}
						/>
					</span>
				</div>
			}
		/>
	);
};

export default PasswordField;
