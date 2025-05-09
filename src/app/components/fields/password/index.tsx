import { useState } from 'react';
import { AnyFieldApi } from '@tanstack/react-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Field from '..';

export const getErrorClass = (hasError: boolean) =>
	hasError
		? 'border border-red-500 bg-red-100 text-black'
		: 'border border-gray-300';

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

	const inputClass = `w-full p-2.5 
						${showError && hasError ? 'text-black bg-red-100' : 'text-white bg-black'} 
						border-2 rounded-[10px] outline-none 
					    transition-colors duration-300 
						focus:border-purple-500 focus:shadow-white/60 
						font-['Ubuntu'] text-base border-gray-500
						focus:outline-none focus:ring focus:ring-purple-300`;

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
						className={`${inputClass} ${getErrorClass(showError && hasError)}`}
					/>
					<span
						onClick={toggleVisibility}
						className={`absolute right-[5px] top-1/2 -translate-y-1/2 cursor-pointer text-[0.8rem] ${showError && hasError ? 'text-black' : 'text-white'}`}
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
